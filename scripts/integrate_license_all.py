"""Copy INDUS license SDK into all product repos and patch entry points."""
from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SDK_PY = ROOT / "public" / "sdk" / "indus_license.py"
SDK_MJS = ROOT / "public" / "sdk" / "indus_license.mjs"
PRODUCTS = Path(r"d:\Dispatch Softwares\_indus-products")

PY_GATE = '''"""Exit if INDUS subscription license is missing or expired."""
from __future__ import annotations

import sys
from pathlib import Path

from indus_license import verify_license


def require_license(root: str | Path | None = None) -> None:
    base = Path(root or Path(__file__).resolve().parent)
    result = verify_license(str(base))
    if not result.ok:
        print(result.message, file=sys.stderr)
        sys.exit(1)
'''

JS_LICENSE = (ROOT / "scripts" / "templates" / "indus_license.cjs")
JS_GATE = '''"use strict";
const { requireIndusLicense } = require("./indus_license");

module.exports = { requireIndusLicense };
'''

# Will write JS license from template file


def write_js_license(dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(JS_LICENSE, dest)


def write_py_sdk(repo: Path, subdir: str | None = None) -> Path:
    target_dir = repo / subdir if subdir else repo
    target_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SDK_PY, target_dir / "indus_license.py")
    (target_dir / "indus_license_gate.py").write_text(PY_GATE, encoding="utf-8")
    return target_dir


def write_js_sdk(repo: Path) -> None:
    lib = repo / "lib"
    lib.mkdir(exist_ok=True)
    write_js_license(lib / "indus_license.js")
    (lib / "indus_license_gate.js").write_text(
        '"use strict";\nconst { requireIndusLicense } = require("./indus_license");\n'
        "module.exports = { requireIndusLicense };\n",
        encoding="utf-8",
    )


def patch_once(path: Path, needle: str, insert: str, before: bool = True) -> bool:
    if not path.exists():
        return False
    text = path.read_text(encoding="utf-8")
    if insert.strip() in text:
        return True
    if needle not in text:
        return False
    if before:
        text = text.replace(needle, insert + needle, 1)
    else:
        text = text.replace(needle, needle + insert, 1)
    path.write_text(text, encoding="utf-8")
    return True


def append_gitignore(repo: Path) -> None:
    gi = repo / ".gitignore"
    lines = gi.read_text(encoding="utf-8") if gi.exists() else ""
    extra = "indus-license*.json\ndata/indus_license_cache.json\n"
    if "indus-license" not in lines:
        gi.write_text(lines.rstrip() + "\n\n" + extra, encoding="utf-8")


def git_commit_push(repo: Path, message: str) -> None:
    subprocess.run(["git", "add", "-A"], cwd=repo, check=False)
    status = subprocess.run(["git", "status", "--porcelain"], cwd=repo, capture_output=True, text=True)
    if not status.stdout.strip():
        print(f"  skip (no changes): {repo.name}")
        return
    subprocess.run(["git", "commit", "-m", message], cwd=repo, check=True)
    subprocess.run(["git", "push"], cwd=repo, check=True)
    print(f"  pushed: {repo.name}")


def integrate_python_main(repo: Path, rel_file: str, marker: str, call: str) -> None:
    write_py_sdk(repo)
    insert = f"{call}\n\n"
    patch_once(repo / rel_file, marker, insert, before=True)


def integrate_node_listen(repo: Path, rel_file: str = "server.js") -> None:
    write_js_sdk(repo)
    path = repo / rel_file
    text = path.read_text(encoding="utf-8")
    if "requireIndusLicense" in text:
        return
    if "dotenv.config();" in text:
        text = text.replace(
            "dotenv.config();",
            "dotenv.config();\nconst { requireIndusLicense } = require('./lib/indus_license');",
            1,
        )
    else:
        text = "const { requireIndusLicense } = require('./lib/indus_license');\n" + text

    if "async function start()" in text:
        text = text.replace(
            "async function start() {",
            "async function start() {\n    await requireIndusLicense(__dirname);",
            1,
        )
    elif "requireIndusLicense(__dirname).then" not in text:
        text = re.sub(
            r"(const PORT = [^\n]+\n\n)(app\.listen\()",
            r"\1requireIndusLicense(__dirname).then(() => \2",
            text,
            count=1,
        )
        text = re.sub(
            r"(app\.listen\([^\n]+\n(?:[^\n]*\n)*?)(\n(?:function |process\.|module\.|$))",
            lambda m: m.group(1) + "}).catch(err => { console.error(err.message || err); process.exit(1); });\n" + m.group(2),
            text,
            count=1,
        )
    path.write_text(text, encoding="utf-8")


def integrate_node_server(repo: Path, rel_file: str = "server.js") -> None:
    integrate_node_listen(repo, rel_file)


def main() -> int:
    if not JS_LICENSE.exists():
        print("Missing JS license template", file=sys.stderr)
        return 1
    if not PRODUCTS.is_dir():
        print(f"Clone products into {PRODUCTS} first", file=sys.stderr)
        return 1

    msg = "Add INDUS subscription license verification on startup."

    # email-verifier-pro
    r = PRODUCTS / "email-verifier-pro"
    if r.is_dir():
        write_js_sdk(r)
        integrate_node_server(r)

    # bulk-email-verifier + mailforge
    for name in ("bulk-email-verifier", "mailforge"):
        r = PRODUCTS / name
        if r.is_dir():
            integrate_node_server(r)

    # multi-smtp
    r = PRODUCTS / "multi-smtp-email-automation"
    if r.is_dir():
        integrate_python_main(r, "email_launcher.py", "def main():", "    from indus_license_gate import require_license\n    require_license()")

    # python-auto-dialer-pro
    r = PRODUCTS / "python-auto-dialer-pro"
    if r.is_dir():
        write_py_sdk(r)
        patch_once(r / "auto_dialer.py", "root = tk.Tk()", "from indus_license_gate import require_license\nrequire_license()\n\n")

    # google-voice-dispatch-agent
    r = PRODUCTS / "google-voice-dispatch-agent"
    if r.is_dir():
        write_py_sdk(r / "src")
        patch_once(r / "src" / "desktop_app.py", "def main() -> None:", "    from indus_license_gate import require_license\n    require_license(runtime_base())\n")
        patch_once(r / "src" / "main.py", "def main() -> None:", "    from indus_license_gate import require_license\n    require_license(runtime_base())\n")

    # playwright scraper
    r = PRODUCTS / "playwright-website-scraper-pro"
    if r.is_dir():
        write_js_sdk(r)
        integrate_node_server(r)
        se = r / "scraper_engine.js"
        if se.exists():
            patch_once(se, "async function main() {", "  await requireIndusLicense(__dirname);\n")
            text = se.read_text(encoding="utf-8")
            if "requireIndusLicense" in text and "require('./lib/indus_license_gate')" not in text:
                se.write_text(
                    "const { requireIndusLicense } = require('./lib/indus_license');\n" + text,
                    encoding="utf-8",
                )

    # Canadian scraper
    r = PRODUCTS / "Canadian-Website-Scraper"
    if r.is_dir():
        write_js_sdk(r)
        patch_once(r / "Scraper.js", "async function main() {", "  await requireIndusLicense(__dirname);\n")
        text = (r / "Scraper.js").read_text(encoding="utf-8")
        if "requireIndusLicense" in text and "./lib/indus_license" not in text:
            (r / "Scraper.js").write_text(
                "const { requireIndusLicense } = require('./lib/indus_license');\n" + text,
                encoding="utf-8",
            )

    # fmcsa - stub runner
    r = PRODUCTS / "fmcsa-safer-scraper"
    if r.is_dir():
        write_py_sdk(r)
        run_py = r / "run.py"
        if not run_py.exists():
            run_py.write_text(
                '"""FMCSA SAFER Scraper entry — requires INDUS license."""\n'
                "from indus_license_gate import require_license\n"
                "require_license()\n"
                'print("FMCSA SAFER Scraper — mount your scraper module after license verification.")\n',
                encoding="utf-8",
            )

    # fiverr electron
    r = PRODUCTS / "fiverr-lead-extractor-crm"
    if r.is_dir():
        write_js_sdk(r)
        em = r / "electron" / "main.js"
        text = em.read_text(encoding="utf-8")
        if "requireIndusLicense" not in text:
            text = "const { requireIndusLicense } = require('./lib/indus_license');\n" + text
            text = text.replace(
                "app.whenReady().then(() => {",
                "app.whenReady().then(async () => {\n  try {\n    await requireIndusLicense(ROOT);\n  } catch (err) {\n    dialog.showErrorBox('INDUS License', err.message || String(err));\n    app.quit();\n    return;\n  }\n",
                1,
            )
            em.write_text(text, encoding="utf-8")

    for repo in sorted(PRODUCTS.iterdir()):
        if not (repo / ".git").is_dir():
            continue
        append_gitignore(repo)
        try:
            git_commit_push(repo, msg)
        except subprocess.CalledProcessError as exc:
            print(f"  failed {repo.name}: {exc}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

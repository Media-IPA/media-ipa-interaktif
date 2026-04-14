import os
import glob

base_dir = r"d:\MEDIA IPA"

for bab_num in range(1, 8):
    bab_dir = os.path.join(base_dir, f"bab{bab_num}")
    index_path = os.path.join(bab_dir, "index.html")
    
    if not os.path.exists(index_path):
        continue
    
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Add Fullscreen Button in nav
    btn_html = '<button id="fullscreenBtn" class="nav-btn" title="Mode Layar Penuh" style="margin-right: 15px;"><i class="fa-solid fa-expand"></i></button>\n            '
    if 'id="fullscreenBtn"' not in content:
        if '<div class="nav-links">\n            <a href="../index.html"' in content:
            content = content.replace('<div class="nav-links">\n            <a href="../index.html"', f'<div class="nav-links">\n            {btn_html}<a href="../index.html"')
        elif '<div class="nav-links">' in content:
            # Fallback
            content = content.replace('<div class="nav-links">', f'<div class="nav-links">\n            {btn_html}')

    # 2. Add Script Tag Before </body>
    script_html = '<script src="../fullscreen.js"></script>\n</body>'
    if 'fullscreen.js' not in content:
        content = content.replace('</body>', script_html)

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Updated all bab files.")

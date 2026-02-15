"""Normalize index.html encoding to clean UTF-8 and fix mojibake."""
import os

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html")

with open(path, "rb") as f:
    raw = f.read()

text = raw.decode("utf-8", errors="ignore")

# ---- Do emoji/mojibake BEFORE smart quotes so sequences with curly quotes still match ----

# Lock/unlock emoji mojibake (ðŸ"' / ðŸ"") -> lock / unlock (curly and straight quote variants)
text = text.replace("\u00f0\u009f\u0094\u0092", "\U0001f512")
text = text.replace("\u00f0\u009f\u0094\u0093", "\U0001f513")
text = text.replace("\u00f0\u0178\u201c\u2019", "\U0001f512")
text = text.replace("\u00f0\u0178\u201c\u201d", "\U0001f513")
text = text.replace("\u00f0\u0178\u201c\u0027", "\U0001f512")
text = text.replace("\u00f0\u0178\u201c\u0022", "\U0001f513")
text = text.replace("\u00f0\u0178\u0022\u2019", "\U0001f512")
text = text.replace("\u00f0\u0178\u0022\u0027", "\U0001f512")
text = text.replace("\u00f0\u0178\u0022\u0022", "\U0001f513")

# Warning emoji mojibake (âš ï¸) -> warning sign
text = text.replace("\u00e2\u009a\u00a0\u00ef\u00b8\u008f", "\u26a0")
text = text.replace("\u00e2\u009a\u00a0", "\u26a0")
text = text.replace("\u00e2\u0161\u0020\u00ef\u00b8\u008f", "\u26a0")
text = text.replace("\u00e2\u0161\u00a0\u00ef\u00b8\u008f", "\u26a0")
text = text.replace("\u00e2\u0161", "\u26a0")

# Clipboard, email, upload, floppy, inbox mojibake -> actual emoji
text = text.replace("\u00f0\u009f\u0093\u008b", "\U0001f4cb")
text = text.replace("\u00f0\u009f\u0093\u00a7", "\U0001f4e7")
text = text.replace("\u00f0\u009f\u0093\u0081", "\U0001f4e2")
text = text.replace("\u00f0\u009f\u0092\u00be", "\U0001f4be")
text = text.replace("\u00f0\u009f\u0093\u00a5", "\U0001f4e5")
text = text.replace("\u00f0\u0178\u201c\u2039", "\U0001f4cb")
text = text.replace("\u00f0\u0178\u201c\u00a7", "\U0001f4e7")
text = text.replace("\u00f0\u0178\u201c\u00a2", "\U0001f4e2")
text = text.replace("\u00f0\u0178\u2019\u00be", "\U0001f4be")
text = text.replace("\u00f0\u0178\u201c\u00a5", "\U0001f4e5")
# Upload (1F4E2) variant with 0x81
text = text.replace("\u00f0\u0178\u201c\u0081", "\U0001f4e2")
text = text.replace("\u00f0\u0178\u0022\u0081", "\U0001f4e2")
# Light bulb (1F4A1) for TIP
text = text.replace("\u00f0\u009f\u0092\u00a1", "\U0001f4a1")
text = text.replace("\u00f0\u0178\u2019\u00a1", "\U0001f4a1")
# After smart-quote pass (third char is "):
text = text.replace("\u00f0\u0178\u0022\u2039", "\U0001f4cb")
text = text.replace("\u00f0\u0178\u0022\u00a7", "\U0001f4e7")
text = text.replace("\u00f0\u0178\u0022\u00a2", "\U0001f4e2")
text = text.replace("\u00f0\u0178\u0022\u00a5", "\U0001f4e5")
# Upload (1F4E2), floppy with ASCII quote
text = text.replace("\u00f0\u0178\u201c\u0081", "\U0001f4e2")
text = text.replace("\u00f0\u0178\u0027\u00be", "\U0001f4be")
# Alarm (1F6A8), light bulb (1F4A1)
text = text.replace("\u00f0\u0178\u0161\u00a8", "\U0001f6a8")
text = text.replace("\u00f0\u009f\u009a\u00a8", "\U0001f6a8")
text = text.replace("\u00f0\u009f\u0092\u00a1", "\U0001f4a1")
text = text.replace("\u00f0\u0178\u2019\u00a1", "\U0001f4a1")

# Em dash / en dash mojibake (â€") -> hyphen
text = text.replace("\u00e2\u20ac\u201c", "-")
text = text.replace("\u00e2\u20ac\u201d", "-")
text = text.replace("\u00e2\u20ac\u2014", "-")
text = text.replace("\u00e2\u20ac\u2013", "-")

# Box drawing horizontal (â") -> hyphen (before â"˜ so info icon stays)
text = text.replace("\u00e2\u0094\u0080", "-")
text = text.replace("\u2500", "-")

# Info icon (â"˜, â„¹ï¸) -> info (small tilde 02DC or combining 0303 or right quote 2019)
text = text.replace("\u00e2\u201c\u02dc", "\u2139")
text = text.replace("\u00e2\u201c\u0303", "\u2139")
text = text.replace("\u00e2\u2019\u02dc", "\u2139")
text = text.replace("\u00e2\u0094\u0098", "\u2139")
text = text.replace("\u00e2\u0084\u00b9\u00ef\u00b8\u008f", "\u2139")
text = text.replace("\u00e2\u0084\u00b9", "\u2139")
# â" (box line 3 chars) then â" (2 chars) -> hyphen (after info)
text = text.replace("\u00e2\u201c\u0081", "-")
text = text.replace("\u00e2\u201c", "-")
# Box drawing U+2501 (E2 94 81)
text = text.replace("\u00e2\u0094\u0081", "-")
text = text.replace("\u2501", "-")

# Checkmark / ballot (âœ…, âœ", âœ-) -> check / X
text = text.replace("\u00e2\u009c\u0085", "\u2713")
text = text.replace("\u00e2\u009c\u0093", "\u2713")
text = text.replace("\u00e2\u009c\u201c", "\u2713")
text = text.replace("\u00e2\u009c\u0096", "\u2717")
text = text.replace("\u00e2\u009c\u2013", "\u2717")
text = text.replace("\u00e2\u009c\u002d", "\u2717")
# Ballot box with check (âœ…) U+2611 UTF-8 E2 98 91
text = text.replace("\u00e2\u0098\u0091", "\u2713")
text = text.replace("\u00e2\u009c\u201d", "\u2713")
text = text.replace("\u00e2\u009c\u201c ", "\u2022 ")
text = text.replace("\u00e2\u009c ", "\u2022 ")
text = text.replace("\u00e2\u009c\u0020", "\u2022 ")
# List / Format Help icon (â) - single or with space
text = text.replace("\u00e2\u009c\u201c", "\u2022")

# ---- Then normalize quotes and dashes ----
# Smart quotes -> normal quotes
text = text.replace("\u201c", '"')
text = text.replace("\u201d", '"')
text = text.replace("\u2018", "'")
text = text.replace("\u2019", "'")

# En/em dash (actual Unicode) -> hyphen
text = text.replace("\u2013", "-")
text = text.replace("\u2014", "-")

# Non-breaking space -> space
text = text.replace("\u00a0", " ")

with open(path, "wb") as f:
    f.write(text.encode("utf-8"))

print("Encoding normalized successfully.")

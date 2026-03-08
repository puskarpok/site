import os, sys, django, json
sys.path.append('d:/antigravity/numerology-app/backend')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from api.utils.numerology_logic import calculate_all

res = calculate_all('PUSKAAR', '01/01/1990')
with open('out.json', 'w') as f:
    json.dump(res, f, indent=2)

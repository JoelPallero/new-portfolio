import json

with open('joelpallero.com.ar-20260224T233746.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Lighthouse Scores:")
for cat_id, cat in data['categories'].items():
    print(f"{cat['title']}: {cat['score'] * 100}%")

print("\nOpportunities & Diagnostics (Performance):")
performance_audits = [
    'render-blocking-resources',
    'unsized-images',
    'unused-javascript',
    'unused-css-rules',
    'modern-image-formats',
    'offscreen-images',
    'font-display',
    'prioritize-lcp-image'
]

for audit_id in performance_audits:
    if audit_id in data['audits']:
        audit = data['audits'][audit_id]
        if audit.get('score', 1) < 1:
            print(f"- {audit['title']} (Score: {audit['score']}): {audit['displayValue'] if 'displayValue' in audit else ''}")
            if 'details' in audit and 'items' in audit['details']:
                for item in audit['details']['items'][:3]:
                    print(f"  * {item}")

print("\nAccessibility Issues:")
for audit_id, audit in data['audits'].items():
    if audit.get('score', 1) < 1 and 'accessibility' in audit.get('id', ''):
         print(f"- {audit['title']} (Score: {audit['score']})")

print("\nSEO Issues:")
for audit_id, audit in data['audits'].items():
    if audit.get('score', 1) < 1 and 'seo' in audit.get('id', ''):
         print(f"- {audit['title']} (Score: {audit['score']})")

"""Generate a single-column English resume from the portfolio content export.
Usage: python scripts/resume.py content.json public/raphael-rocha-resume.pdf
Requires reportlab. The original supplied PDF is retained separately.
"""
import json, sys, re
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
D=json.load(open(sys.argv[1])); T=D['copy']['en']
styles={
 'name':ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=26,leading=30,textColor=HexColor('#24344c'),spaceAfter=7),
 'subtitle':ParagraphStyle('subtitle',fontName='Helvetica',fontSize=12,leading=17,textColor=HexColor('#43556e'),spaceAfter=9),
 'section':ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=10,leading=14,textColor=HexColor('#314966'),spaceBefore=15,spaceAfter=9),
 'role':ParagraphStyle('role',fontName='Helvetica-Bold',fontSize=10.2,leading=14,textColor=HexColor('#202b3b'),spaceAfter=3),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=9.7,leading=14,textColor=HexColor('#334155'),spaceAfter=7,alignment=TA_LEFT),
 'meta':ParagraphStyle('meta',fontName='Helvetica',fontSize=8.7,leading=12,textColor=HexColor('#536174'),spaceAfter=5),
}
def text(s): return escape(s.replace('—','-').replace('–','-').replace('’',"'").replace('·',' | '))
def p(s,style='body'):return Paragraph(text(s),styles[style])
def period(s):
 months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
 return re.sub(r'(\d{2})\.(\d{4})',lambda m:months[int(m[1])-1]+' '+m[2],s)+(' Present' if s.endswith('—') else '')
def role(item):
 return KeepTogether([p(item['company']+' | '+item['title']['en'],'role'),p(period(item['period']),'meta'),p(item['description']['en']),Spacer(1,5)])
story=[p('Raphael Rocha','name'),p('Senior Mobile Engineer | Full-stack development | Applied AI','subtitle'),
 p('raphaelrochabcc@gmail.com | github.com/RaphaelSR','meta'),
 Paragraph('<link href="https://portfolio.raphaelrocha.com/en/">Portfolio</link> | <link href="'+D['links']['linkedin']+'">LinkedIn</link>',styles['meta']),
 Spacer(1,7),p(T['intro']),p(T['aboutText2']),
 p('TECHNICAL SKILLS','section'),p('React Native, Expo, TypeScript, React, Next.js, Node.js, NestJS, REST APIs, GraphQL, Jest, Maestro, accessibility, Git and CI/CD.'),
 p('PROFESSIONAL EXPERIENCE','section')]
for item in D['experience'][:6]:story.append(role(item))
story += [PageBreak(),p('Raphael Rocha','subtitle'),p('EARLIER EXPERIENCE','section')]
for item in D['experience'][6:]:story.append(role(item))
story += [p('SELECTED PROJECTS','section')]
for project in [D['projects'][0],D['projects'][2]]:
 story.append(KeepTogether([p(project['name'],'role'),p(project['contribution']['en']),Paragraph('<link href="'+project['url']+'">'+project['url']+'</link>',styles['meta'])]))
story += [p('EDUCATION & LANGUAGES','section'),p("Bachelor's degree in Computer Science | CESUPA | 2014-2018"),p(T['languages']),p(T['concurrent'],'meta')]
def footer(canvas,doc):
 canvas.setTitle('Raphael Rocha - Senior Mobile Engineer - Resume 2026'); canvas.setAuthor('Raphael Rocha')
 canvas.setFont('Helvetica',8);canvas.setFillColor(HexColor('#536174'));canvas.drawString(43,26,'Raphael Rocha | Software Engineering');canvas.drawRightString(552,26,str(doc.page))
SimpleDocTemplate(sys.argv[2],pagesize=(595.28,841.89),rightMargin=43,leftMargin=43,topMargin=37,bottomMargin=39).build(story,onFirstPage=footer,onLaterPages=footer)

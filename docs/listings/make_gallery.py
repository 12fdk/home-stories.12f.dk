import sys
from PIL import Image, ImageDraw, ImageFont
SRC="/Users/robert/Git/Home-Stories/home-stories/fastlane/screenshots/en-US/iPhone 16 Pro-"
LOGO="/Users/robert/Git/Home-Stories/home-stories.12f.dk/public/logo.png"
OUT=sys.argv[1]
W,H=1270,760
BG=(235,235,231); INK=(24,25,27); SIG=(255,74,31); MUTED=(80,82,86)
def font(size,weight):
    idx={400:0,500:10,700:1}[weight]
    return ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc",size,index=idx)
def phone(name,captioned):
    im=Image.open(SRC+name+".png").convert("RGBA")
    if captioned: im=im.crop((0,320,im.width,im.height))
    for c in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]:
        ImageDraw.floodfill(im,c,(0,0,0,0),thresh=12)
    bb=im.getbbox(); im=im.crop(bb)
    return im
def wrap(d,text,f,maxw):
    words=text.split(); lines=[]; cur=""
    for w in words:
        t=(cur+" "+w).strip()
        if d.textlength(t,font=f)<=maxw: cur=t
        else: lines.append(cur); cur=w
    lines.append(cur); return lines
slides=[
 ("01-hero","Plan your renovation. Track what it really costs.","Tasks, items, photos and the budget for every home project, in one app.",[("01_ProjectsList",True),("kitchen_01_KitchenOverview",False)],True),
 ("02-budget","See the overrun before it happens.","Every item adds its price to the total. Budget vs. actual chart with Pro.",[("02_BudgetChart",True),("budget_01_BudgetMultiProject",False)],False),
 ("03-items","Saw it in the store? Save it.","Snap a photo, add the price, the shop and a note. Or share it from Safari.",[("04_Items",True),("kitchen_04_KitchenItems",False)],False),
 ("04-photos","Before, during and after.","A photo timeline for the whole project, with side-by-side before and after.",[("03_PhotoTimeline",True),("photos_03_PhotoTimeline",False)],False),
 ("05-tasks","Tasks and time, kept in one place.","Due dates and reminders (Pro), a built-in timer and Home Screen widgets.",[("05_Tasks",True),("09_Widgets",True)],False),
 ("06-share","Renovate together.","Share a project with your partner or contractor and export a PDF report (Pro).",[("10_iCloudSync",True),("07_ExportPDF",True)],False),
]
for key,head,sub,phones,hero in slides:
    can=Image.new("RGB",(W,H),BG); d=ImageDraw.Draw(can)
    x0=64; tw=540
    y=150
    if hero:
        lg=Image.open(LOGO).convert("RGBA").resize((96,96))
        can.paste(lg,(x0,y-20),lg)
        d.text((x0+116,y+10),"Home Stories",font=font(40,700),fill=INK)
        y+=120
    else:
        d.rectangle((x0,y,x0+56,y+8),fill=SIG); y+=40
    hf=font(54 if not hero else 50,700)
    for ln in wrap(d,head,hf,tw):
        d.text((x0,y),ln,font=hf,fill=INK); y+=64
    y+=16; sf=font(27,400)
    for ln in wrap(d,sub,sf,tw):
        d.text((x0,y),ln,font=sf,fill=MUTED); y+=38
    ff=font(22,500)
    d.text((x0,H-70),"Free download · Pro is one-time, no subscription",font=ff,fill=MUTED)
    ph=690
    imgs=[phone(n,c) for n,c in phones]
    imgs=[im.resize((int(im.width*ph/im.height),ph),Image.LANCZOS) for im in imgs]
    xr=W-40
    # back phone offset
    b=imgs[1]; f=imgs[0]
    bx=xr-b.width; can.paste(b,(bx,(H-ph)//2+30),b)
    fx=bx-f.width+90; can.paste(f,(fx,(H-ph)//2-10),f)
    can.save(f"{OUT}/{key}.png",optimize=True)
    print(key)

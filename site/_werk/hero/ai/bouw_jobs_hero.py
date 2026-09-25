"""Bouwt jobs-hero.json: 6 cutout-varianten (3 scenes x 2 bezettingen) van Top Movers-verhuizers op magenta,
heupversie, 16:9, voor het hero-figuur van de Kievit-homepage. Gezichten uit de gezichten-mixbibliotheek
(kop-01 t/m 19, akkoord ligt er), merk uit echte Top Movers-foto's (polo-borstprint uit foto 66, doos uit
foto 22) plus het logobestand als laatste referentie. Gebruik: python3 bouw_jobs_hero.py -> jobs-hero.json"""
import json, os
R=lambda n: os.path.abspath(os.path.join('refs',n))
FACE={'A09':R('kop-09-krullen-baardje-30er@4x.png'),'A13':R('kop-13-kort-grijs-sportief@4x.png'),'A02':R('kop-02-kaal-rossige-baard@4x.png'),
      'A15':R('kop-15-jong-blond-bus@4x.png'),'A11':R('kop-11-sleek-baard-kaaklijn@4x.png'),'A18':R('kop-18-opgeschoren-baard-jong@4x.png'),'A06':R('kop-06-jong-blond-coupe@4x.png')}
DESC={'A09':"32 years old, medium build, short dark curly hair, short dark beard, no glasses",
      'A13':"50 years old, lean athletic build, short grey hair, clean-shaven, no glasses",
      'A02':"36 years old, sturdy build, shaved bald head, full red-blond beard, no glasses",
      'A15':"25 years old, slim, short blond hair, boyish face, clean-shaven, no glasses",
      'A11':"33 years old, medium build, dark hair combed straight back, full dark beard, no glasses",
      'A18':"30 years old, medium build, dark hair with shaved sides, short dark beard, no glasses",
      'A06':"20 years old, slim, short blond quiff, clean-shaven, no glasses"}
POLO=R('polo-borstprint.png'); DOOS=R('doos-topmovers.png'); LOGO=R('logo-topmovers.png'); STEEK=R('steekwagen.png')
BRANDING=("Brand: Top Movers, a Dutch moving company. "
 "ABSOLUTE RULE, uniform: every mover wears the same dark anthracite-grey polo shirt with a collar and three buttons (a plain dark grey, like #3b3b3b), never a t-shirt, never a jacket, never a sweater. "
 "On the left chest sits the small Top Movers chest print exactly as in the attached polo reference: the word TOP in bold white capitals with, directly under it, the word MOVERS in white italic capitals, and a thin teal swoosh (#00A19B) curving from lower left under the letters up to a small arrow point at the right; "
 "about 8 cm wide, printed white and teal on the dark fabric, exactly ONCE on the whole outfit, on the left chest only, never on the sleeve, never on the back, never mirrored, every letter reads left to right. Dark grey work trousers with a belt, no caps, no earbuds, no gloves, no hi-vis. "
 "ABSOLUTE RULE, boxes: the moving boxes are sturdy plain WHITE cardboard moving boxes of about 48 x 32 x 36 cm, closed with clear tape, and on the long side they carry the big Top Movers logo exactly as in the attached box reference and the attached logo file: "
 "T-O-P in heavy black capitals, M-O-V-E-R-S in black italic capitals directly beneath, and the teal swoosh (#00A19B) curving from lower left up to an arrow point at the right; the logo is about a third of the box width and is the ONLY thing printed on the box: no other words, no numbers, no dimensions, no size line, no weight, no labels, no bee, no slogan, no handwriting. "
 "The logo colours are EXACTLY black and teal, never orange, never red, never blue, never green.")
CUTOUT=("ABSOLUTE RULE, cutout plate: the background is one flat, even, pure magenta (#FF00FF) void that fills the frame edge to edge. "
 "NOTHING is rendered behind the subjects: no studio backdrop, no seamless paper, no cyclorama, no light grey or cream wall, no lighter rectangle, panel or board behind the people, no floor, no ground line, no horizon, no shadows or reflections on the background, no vignette, no gradient. "
 "The flat magenta touches the outline of every person and every object directly on all sides, also in the gaps between two people and between an arm and the body. "
 "Everything below the movers' thighs is outside the frame: the bottom edge of the frame cuts through the upper thighs, well above the knees, so no knees, no shins, no feet. "
 "The whole group fills about 60 percent of the frame width, centred, and leaves a clear empty magenta margin on the left, right and top: no body part, box corner, handle or wheel touches or comes near the left, right or top border. "
 "No outline, no glow and no white edge around the subjects: skin, hair, cloth and cardboard meet the magenta directly with natural soft edges.")
CAMERA=("Camera and light: 85 mm lens from 4 meters at chest height, f/5.6, every face, the chest prints and every letter on the boxes sharp. "
 "Soft overcast daylight with a gentle directional key from the upper left: soft-edged shadows on the faces, the left cheek slightly brighter than the right, highlights may clip on the white boxes. "
 "Real photograph, not an illustration, not a 3D render: real skin with pores and fine lines, slight sensor noise, natural colours, no HDR, no plastic skin. "
 "All of them look straight into the lens with a calm, friendly, confident expression: a natural relaxed smile, not identical grins, mouths mostly closed. "
 "Every hand really grips what it holds, fingers wrapped around the object, no hands pressed against empty air. Each person keeps his belly turned towards what he carries, arms in front of the body.")
NEG=("Negative: no misspelling, no mirrored or reversed letters, no extra words, no other logos or brand names, no label fields on boxes, no tape with text, no dimensions on boxes, no numbers, no bee, no slogan, "
 "no extra people, no floor, no ground, no horizon, no shadow on the background, no white outline, no glow, no illustration, no HDR, no teal-orange grading, no plastic skin, no extra fingers, no caps, no hi-vis vests, no straps or ropes, no knees, no feet, no shoes, no truck, no van.")
OBJ={
 'doos':"one white Top Movers box held upright in front of the body with both hands under its bottom, the printed long side facing the camera, the top of the box at chest height",
 'doos2':"two white Top Movers boxes stacked on each other, carried with both hands under the bottom box, both printed long sides facing the camera, the top box at chin height",
 'doosheup':"one white Top Movers box resting on his right hip, his right arm under it and his left hand on its top edge, the printed long side facing the camera",
 'steek':"a plain unbranded two-wheeled hand truck (exactly like the attached hand-truck reference, no print on it) held upright close to his body with two white Top Movers boxes stacked upright on it, both printed sides facing the camera, one hand on each handle, the whole hand truck inside the width of his own shoulders",
 'deken':"a thick folded grey moving blanket draped over his left forearm, his right hand holding a roll of clear packing tape",
}
def refs_text(n_faces, steek):
    s=f"Attached images in order: {', '.join(f'{i+1}) face reference for mover {chr(65+i)} (frontal)' for i in range(n_faces))}; "
    k=n_faces+1
    s+=f"{k}) brand reference: the small chest print as it sits on the dark grey polo; {k+1}) brand reference: a real Top Movers moving box with the printed logo"
    if steek: s+=f"; {k+2}) object reference: the plain hand truck; {k+3}) the LAST attached reference image is the exact Top Movers logo file: reproduce it letter for letter."
    else: s+=f"; {k+2}) the LAST attached reference image is the exact Top Movers logo file: reproduce it letter for letter."
    return s
def job(name, personen, objecten, extra=""):
    steek = 'steek' in objecten
    refs=[FACE[p] for p in personen]+[POLO,DOOS]+([STEEK] if steek else [])+[LOGO]
    wie=" ".join(f"Mover {chr(65+i)} (face reference {i+1}): {DESC[p]}; exactly this face, age and build, no younger, no older, not heavier." for i,p in enumerate(personen))
    pos=" ".join(f"Mover {chr(65+i)} {['stands on the left','stands in the middle, half a step further back','stands on the right'][i] if len(personen)==3 else ['stands on the left','stands on the right, half a step further back so their shoulders overlap slightly'][i]} and holds {OBJ[o]}." for i,(p,o) in enumerate(zip(personen,objecten)))
    prompt="\n".join([BRANDING,CUTOUT,f"Exactly {len(personen)} people in the image, shoulder to shoulder. "+wie,"Scene: "+pos+" "+extra,CAMERA,refs_text(len(personen),steek),NEG])
    return {'name':name,'prompt':prompt,'refs':refs,'aspect':'16:9','size':'2K'}
JOBS=[
 job('hero-01-duo-doos-doos2',['A09','A13'],['doos','doos2']),
 job('hero-02-duo-doos-doos2',['A18','A02'],['doos','doos2']),
 job('hero-03-trio-steek-doos-deken',['A02','A15','A11'],['steek','doos','deken']),
 job('hero-04-trio-steek-doos-deken',['A13','A09','A06'],['steek','doos','deken']),
 job('hero-05-duo-doosheup-doos',['A11','A15'],['doosheup','doos'],"Mover A stands a little more relaxed, weight on one leg."),
 job('hero-06-duo-doosheup-doos',['A06','A18'],['doosheup','doos'],"Mover A stands a little more relaxed, weight on one leg."),
]
json.dump(JOBS,open('jobs-hero.json','w'),indent=1); print(len(JOBS),'jobs')

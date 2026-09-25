> Keuze 25-09-2026: uitsnede 1 goedgekeurd (homehero, site/assets/img/hero/drie-werkers-900/1600.webp; vrijstaand in beeldronde-debresser/drie-werkers/drie-werkers-1-terrein-dekens-uitsnede.png). Uitsnede 2 viel af; versie-2.png en mock-2.jpg zijn verwijderd. De regels hieronder over trio 2 zijn alleen nog geschiedenis.

# Drie werkers in de homehero (25-09-2026)

Niets gegenereerd: uitsneden van de goedgekeurde groepsfoto's in beeldronde-debresser/drie-werkers/.

1. `python site/_werk/cutout_mat.py beeldronde-debresser/drie-werkers/<naam>.png <scratch>/<naam>-mat.png --margin 40`
   (BiRefNet-masker + closed-form matting). Zachte rand: trio 1 8,3 %, trio 2 10,0 %; randhelderheid gelijk aan het binnenwerk (geen halo).
2. Afgesneden vanaf de bovenkant van de hoofden: trio 1 op 760 px (onder de handen), trio 2 op 800 px (heup), links en rechts op de alfarand.
3. Mock: scratchpad mock_trio.py zet het beeld via Playwright in de echte homepage (localhost:4740) met werk/mock_trio.css;
   er staat niets in site/. Vanaf 761px vult het trio de ruimte tussen kop en formulier (hoogte = die ruimte + 80px achter het formulier);
   op de telefoon 150-190px hoog onder de kop.

Na goedkeuring: webp 900/1600 naar site/assets/img/hero/, <picture class="hero__pic"> in hero() (alleen home), mock_trio.css naar het d1-blok in style.css.

// Data object containing all questions for the questionnaire
window.questionnaireData = {
    sections: [
        {
            id: 'section1',
            title: 'Deel 1. Doelgerichtheid',
            description: 'Dit deel gaat over doel, doelgroep en aanwijzingen voor gebruik.(Context)',
            questions: [
                {
                    id: 'C1',
                    text: 'Het is duidelijk voor welke doelgroep de applicatie is bedoeld (denk aan leeftijd, voorkennis, digitale geletterdheid, niveau etc.).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Doelgroepanalyse uitvoeren",
                            description: "Voer een grondige doelgroepanalyse uit met aandacht voor leeftijd, voorkennis en digitale vaardigheden. Betrek hierbij vertegenwoordigers van de doelgroep.",
                            resources: [
                                { title: "Handleiding doelgroepanalyse", url: "https://www.vanafnuonline.nl/educational_effectiveness/src/Doelgroepanalyse%20XR-applicaties.pdf" },
                                { title: "Persona's ontwikkelen", url: "https://storychief.io/blog/nl/personas-maken-template" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C2',
                    text: 'Er is een helder, concreet beschreven leerdoel, dat begrijpelijk is voor alle betrokkenen (ontwikkelaar, leraar, gebruiker).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Leerdoelen verduidelijken",
                            description: "Formuleer leerdoelen volgens het SMART-principe en zorg dat ze begrijpelijk zijn voor alle betrokken partijen (ontwikkelaars, docenten en studenten).",
                            resources: [
                                { title: "Voorbeelden van goede leerdoelen", url: "https://ahaslides.com/nl/blog/learning-objectives-examples/" },
                                { title: "Leerdoelen formuleren", url: "https://www.ru.nl/medewerkers/docenten/onderwijs-ontwerpen/cursussen-ontwerpen/leerdoelen-formuleren" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C3',
                    text: 'Het leerdoel is relevant voor de doelgroep.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Relevantie vergroten",
                            description: "Toon expliciet de relevantie van de leerdoelen voor de doelgroep door concrete voorbeelden en praktijksituaties te gebruiken.",
                            resources: [
                                // { title: "Contextueel leren", url: "#" },
                                // { title: "Praktijkvoorbeelden verzamelen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C4',
                    text: 'Het leerdoel is betekenisvol voor de dagelijkse ervaringen van de doelgroep.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Dagelijkse toepassingen benadrukken",
                            description: "Koppel de leerdoelen aan dagelijkse situaties en ervaringen van de doelgroep om de betekenisvolheid te vergroten.",
                            resources: [
                                // { title: "Contextueel leren", url: "#" },
                                // { title: "Levensecht leren toepassen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C5',
                    text: 'Het leerdoel is haalbaar voor de doelgroep.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Haalbaarheid vergroten",
                            description: "Pas het niveau van de leerdoelen aan aan het niveau van de doelgroep. Overweeg differentiatie voor verschillende niveaus binnen de groep.",
                            resources: [
                                // { title: "Differentiatie in het onderwijs", url: "#" },
                                // { title: "Niveaus bepalen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C6',
                    text: 'De applicatie past bij wat de doelgroep in het algemeen leuk en aantrekkelijk vindt (aansprekende look & feel, aansprekende uitdagingen).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Aantrekkelijkheid vergroten",
                            description: "Verken de interesses en voorkeuren van de doelgroep en pas het ontwerp hierop aan. Betrek de doelgroep bij het ontwerpproces.",
                            resources: [
                                { title: "Voorkennis activeren", url: "https://vernieuwenderwijs.nl/6-werkvormen-voorkennis-activeren/" },
                                // { title: "User-centered design", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C7',
                    text: 'De applicatie is gebruiksvriendelijk voor de doelgroep (denk aan hanteren hardware en navigatie).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Gebruiksvriendelijkheid verbeteren",
                            description: "Voer gebruikersonderzoek uit om knelpunten in de gebruiksvriendelijkheid te identificeren en los deze systematisch op.",
                            resources: [
                                // { title: "Usability testing", url: "#" },
                                // { title: "Toegankelijkheidsrichtlijnen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C8',
                    text: 'De applicatie bevat een instructie voor de gebruikers, ingebouwd of los van de applicatie.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Instructies verbeteren",
                            description: "Ontwikkel duidelijke, beknopte instructies met visuele ondersteuning. Test deze met gebruikers om de begrijpelijkheid te waarborgen.",
                            resources: [
                                { title: "Effectieve instructies schrijven (podcast)", url: "https://wijzelessen.transistor.fm/episodes/s2-3-geef-duidelijke-gestructureerde-en-uitdagende-instructie" },
                                // { title: "Visuele handleidingen ontwerpen", url: "" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C9',
                    text: 'De applicatie bevat aanwijzingen voor reflectie/bespreking met de gebruikers na het gebruik ervan, ingebouwd of los van de applicatie.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Reflectie stimuleren",
                            description: "Integreer reflectiemomenten in de applicatie met gerichte vragen die aanzetten tot diepgaande reflectie op het leerproces.",
                            resources: [
                                { title: "Reflectie methoden en technieken", url: "https://www.ru.nl/medewerkers/docenten/onderwijs-ontwerpen/cursussen-ontwerpen/leerdoelen-integreren" },
                                { title: "Reflectie op professinele identiteit (podcast)", url: "https://korthagen.nl/podcast/aflevering-1-reflectie-op-professionele-identiteit/" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C10',
                    text: 'De applicatie omvat aanwijzingen voor de didactische rol van de leraar (trainer, begeleider).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Docentondersteuning versterken",
                            description: "Bied duidelijke richtlijnen en ondersteuningsmateriaal voor docenten over hun rol bij het gebruik van de applicatie.",
                            resources: [
                                // { title: "Rol van de docent bij technologie", url: "#" },
                                // { title: "Docentenhandleiding opstellen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'C11',
                    text: 'De applicatie toont een samenhangende lijn van leerdoel(en), activiteiten, evaluatie en reflectie/bespreking.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Leerlijn versterken",
                            description: "Zorg voor een duidelijke opbouw in de leerstof, met een logische volgorde van leerdoelen, activiteiten en evaluatiemomenten.",
                            resources: [
                                { title: "Wat is constructive alignment?", url: "https://vernieuwenderwijs.nl/barend-legt-uit-constructive-alignment-video/" },
                                { title: "Constructive alignment toepassen.", url: "https://www.ru.nl/medewerkers/docenten/onderwijs-ontwerpen/cursussen-ontwerpen/leerdoelen-integreren" },

                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'section2',
            title: 'Deel 2. Didactiek',
            description: 'Het gaat in dit deel om de uitdagingen en inhouden die de gebruiker in de applicatie krijgt aangeboden en de manier waarop dit gebeurt.(Intervention)',
            questions: [
                {
                    id: 'I1',
                    text: 'De technologie heeft een duidelijke meerwaarde voor het leerproces van de gebruiker.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Meerwaarde aantonen",
                            description: "Maak expliciet duidelijk wat de toegevoegde waarde is van de technologie ten opzichte van traditionele leermiddelen. Toon concrete voorbeelden van verbeterde leerresultaten.",
                            resources: [
                                { title: "Vier in balans: een betrouwbaar houvast bij keuzes voor ICT-inzet", url: "https://www.kennisnet.nl/beleid-en-organisatie/vier-in-balans-een-betrouwbaar-houvast-bij-keuzes-voor-ict-inzet/" },
                                // { title: "Effectiviteit meten", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I2',
                    text: 'De technologie doet een functioneel beroep op meerdere zintuigen, maar leidt niet af van het leerdoel (spelelement, snufjes, doorkliklinkjes, afleidende \"leuke\" plaatjes, overmatig complexe bediening).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Multisensorieel leren optimaliseren",
                            description: "Zorg voor een evenwichtige inzet van zintuiglijke prikkels die het leren ondersteunen zonder af te leiden. Vermijd overdaad aan visuele of auditieve prikkels.",
                            resources: [
                                // { title: "Multisensorieel leren in het onderwijs", url: "#" },
                                { title: "Dualcode theorie", url: "https://onderzoekonderwijs.net/2017/03/31/de-leerverdubbelaar/" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I3',
                    text: 'Informatie in de applicatie is volledig, correct en relevant.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Inhoud valideren",
                            description: "Laat de inhoud controleren door vakdeskundigen op juistheid, volledigheid en actualiteit. Zorg voor regelmatige updates.",
                            resources: [
                                // { title: "Content validatie", url: "#" },
                                // { title: "Expert review uitvoeren", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I4',
                    text: 'De activiteiten binnen de applicatie worden goed gedoseerd aangeboden, zodat de gebruiker niet overvraagd wordt (geen cognitieve overbelasting).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Cognitieve belasting beheren",
                            description: "Pas de hoeveelheid informatie en complexiteit van opdrachten aan aan het niveau van de gebruiker. Houd rekening met de cognitieve belasting.",
                            resources: [
                                { title: "Cognitieve belastingstheorie", url: "De Wijsneuzen - aflevering 20: Cognitieve belasting - Vernieuwenderwijs " },
                                // { title: "Informatie doseren", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I5',
                    text: 'De gebruiker voert activiteiten uit die didactisch verantwoord zijn voor het behalen van het leerdoel.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Leeractiviteiten afstemmen",
                            description: "Zorg voor een duidelijke koppeling tussen de leeractiviteiten en de leerdoelen. Vermijd overbodige of niet-relevante oefeningen.",
                            resources: [
                                { title: "Lesgeven vanuit leerdoelen (podcast)", url: "https://vernieuwenderwijs.nl/de-wijsneuzen-aflevering11-leerdoelen/" },
                                // { title: "Doelgerichte oefeningen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I6',
                    text: 'De gebruiker kan geen activiteiten overslaan die essentieel zijn voor het leerproces.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Leerroute structureren",
                            description: "Zorg voor een logische opbouw in de leerstof en voorkom dat gebruikers essentiële onderdelen kunnen overslaan. Gebruik eventueel een verplichte volgorde of voortgangscontroles.",
                            resources: [
                                { title: "Lesgeven vanuit leerdoelen (podcast)", url: "https://vernieuwenderwijs.nl/de-wijsneuzen-aflevering11-leerdoelen/" },
                                // { title: "Adaptief leren", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I7',
                    text: 'Voorkennis die de gebruiker nodig heeft, wordt in de applicatie op een actieve wijze geactiveerd.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Voorkennis activeren",
                            description: "Start met het ophalen van relevante voorkennis voordat nieuwe stof wordt aangeboden. Gebruik hiervoor bijvoorbeeld vragen, casussen of korte opdrachten.",
                            resources: [
                                { title: "Voorkennis activeren", url: "https://vernieuwenderwijs.nl/6-werkvormen-voorkennis-activeren/" },
                                // { title: "Scaffolding technieken", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I8',
                    text: 'Voor gebruikers die de voorkennis moeten opfrissen, is er een hulproute (voorinstructie) ingebouwd.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Ondersteuning op maat bieden",
                            description: "Voorzie in extra uitleg of oefeningen voor gebruikers die bepaalde voorkennis missen. Dit kan via een aparte hulpfunctie of extra oefenmodule.",
                            resources: [
                                // { title: "Differentiatie in de les", url: "#" },
                                { title: "Ondersteun bij moeilijke opdrachten", url: "https://wijzelessen.transistor.fm/episodes/8-ondersteun-bij-moeilijke-opdrachten" },
                                { title: "Scaffoling (podcast)", url: "https://vernieuwenderwijs.nl/de-wijsneuzen-aflevering24-scaffolding/" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I9',
                    text: 'Gebruikers voor wie vakinhouden, handelingen of aanpak nieuw zijn, krijgen hulp in de vorm van (bijvoorbeeld) een stap-voor-stap uitleg, demonstratie, help-screen of concreet voorbeeld.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Hulpmiddelen versterken",
                            description: "Bied verschillende vormen van ondersteuning aan, zoals stap-voor-stap instructies, video's, of voorbeelden. Houd rekening met verschillende leerstijlen.",
                            resources: [
                                // { title: "Meervoudige intelligentie", url: "#" },
                                { title: "Effectieve instructie (podcast)", url: "https://vernieuwenderwijs.nl/de-wijsneuzen-aflevering-53-effectieve-instructie/" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I10',
                    text: 'De hulp die gebruikers krijgen, is aangepast aan het beheersingsniveau: naarmate de gebruiker bekwamer wordt, vermindert de hulp.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Adaptieve ondersteuning implementeren",
                            description: "Pas het niveau van ondersteuning automatisch aan op basis van de prestaties van de gebruiker. Verminder geleidelijk aan de hulp naarmate de gebruiker vaardiger wordt.",
                            resources: [
                                // { title: "Adaptief leren", url: "#" },
                                { title: "Scaffoling (podcast)", url: "https://vernieuwenderwijs.nl/de-wijsneuzen-aflevering24-scaffolding/" }
                            ]
                        }
                    ]
                },
                {
                    id: 'I11',
                    text: 'Als er sprake is van een leerroute in de applicatie, dan kan de leraar deze op eenvoudige wijze aanpassen qua moeilijkheid en/of tempo.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Aanpasbaarheid verbeteren",
                            description: "Zorg voor een eenvoudig te bedienen interface waarmee docenten de leerroute kunnen aanpassen aan de behoeften van individuele leerlingen of groepen.",
                            resources: [
                                 // { title: "Leerlingvolgsystemen", url: "#" },
                                { title: "Een coachende rol aannemen (podcast)", url: "https://open.spotify.com/episode/0NnpCkPLTxDTYIz4JVdBZg" }
                       
                            ]
                        }
                    ]
                },
                {
                    id: 'I12',
                    text: 'De gekozen technologie past bij doel, doelgroep en context waarin de applicatie ingezet wordt.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Aanpasbaarheid verbeteren",
                            description: "Stel jezelf de vraag: Kan mijn gekozen vorm in deze context het doel halen voor deze doelgroep? Zo niet ,pas de vorm aan (bijvoorbeeld door het compacter, interactiever of flexibeler te maken).",
                            resources: [
                                // { title: "Differentiatie in de klas", url: "#" },
                                // { title: "Leerlingvolgsystemen", url: "#" }
                            ]
                        }
                    ]
                }
                
            ]
        },
        {
            id: 'section3',
            title: 'Deel 3. Leermechanismen',
            description: 'Dit deel bevat stellingen over de processen die de applicatie bij de gebruiker in werking zet en hoe dat gebeurt. (Mechanics)',
            questions: [
                {
                    id: 'M1',
                    text: 'De activiteiten in de applicatie sturen aan op de noodzakelijke/gewenste leerprocessen.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Leerprocessen versterken",
                            description: "Zorg voor een duidelijke koppeling tussen de activiteiten in de applicatie en de gewenste leerprocessen. Gebruik evidence-based leerstrategieën.",
                            resources: [
                                // { title: "Effectieve leerstrategieën", url: "#" },
                                { title: "Leren leren", url: "https://wijzelessen.transistor.fm/episodes/s3-13-leer-je-leerlingen-effectief-leren" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M2',
                    text: 'De technologie zet in het algemeen geen ongewenste neven-processen in werking, zoals het ontstaan van negatieve emoties bij aangrijpende uitdagingen, gevoel van desoriëntatie, motion sickness o.i.d.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Nadelige effecten minimaliseren",
                            description: "Voer gebruikerstesten uit om eventuele negatieve effecten zoals desoriëntatie of motion sickness te identificeren en los deze op. Bied eventueel aanpassingsmogelijkheden aan.",
                            resources: [
                                { title: "Motion sickness voorkomen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M3',
                    text: 'De applicatie stimuleert samenwerkend/sociaal leren.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Samenwerking faciliteren",
                            description: "Integreer mogelijkheden voor samenwerking, zoals gezamenlijke opdrachten, peer feedback of discussiefora. Zorg voor duidelijke instructies over de samenwerking.",
                            resources: [
                                { title: "Samenwerkend leren", url: "#" },
                                { title: "Coöperatieve werkvormen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M4',
                    text: 'De technologie zorgt voor een andere manier van leren om het leerdoel te behalen dan in traditionele onderwijssettingen.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Meerwaarde van technologie benutten",
                            description: "Maak optimaal gebruik van de unieke mogelijkheden van de technologie, zoals het simuleren van gevaarlijke of complexe situaties die in het echt niet mogelijk zijn.",
                            resources: [
                                { title: " ", url: "#" },
                                { title: "Immersieve leerervaringen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M5',
                    text: 'De technologie geeft de gebruiker inzicht in zijn voortgang/ontwikkeling (feedback via bv. badges, levels).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Voortgang inzichtelijk maken",
                            description: "Bied duidelijke en gedetailleerde feedback over de voortgang van de gebruiker. Gebruik hiervoor bijvoorbeeld een dashboard met behaalde resultaten en verbeterpunten.",
                            resources: [
                                { title: "Formatieve evaluatie", url: "#" },
                                { title: "Leerlingvolgsystemen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M6',
                    text: 'De gebruiker krijgt feedback waarmee hij/zij leerstrategieën/passende aanpakken aanleert of versterkt.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Feedback verbeteren",
                            description: "Zorg voor specifieke, constructieve feedback die de gebruiker helpt om zijn/haar aanpak te verbeteren. Richt je zowel op wat goed gaat als op verbeterpunten.",
                            resources: [
                                { title: "Effectieve feedback geven", url: "#" },
                                { title: "Formatieve assessment technieken", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M7',
                    text: 'De mate waarin de gebruiker het gevoel heeft echt aanwezig te zijn in de virtuele wereld ondersteunt het leren.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Aanwezigheidsgevoel versterken",
                            description: "Optimaliseer de ervaring om het gevoel van aanwezigheid te vergroten. Let hierbij op beeldkwaliteit, geluid en interactiemogelijkheden.",
                            resources: [
                                { title: "Presence in VR", url: "#" },
                                { title: "Immersieve ervaringen ontwerpen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M8',
                    text: 'Het perspectief dat de gebruiker inneemt in de virtuele wereld ondersteunt het leren (vanuit jezelf, vanuit een ander, of vanuit een derde persoon).',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Perspectief optimaliseren",
                            description: "Kies het meest geschikte perspectief voor de leerdoelen en zorg ervoor dat dit perspectief bijdraagt aan het leerproces. Overweeg om gebruikers te laten wisselen van perspectief.",
                            resources: [
                                { title: "Perspectief in VR", url: "#" },
                                { title: "Empathie en perspectief", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M9',
                    text: 'De afstand van de gebruiker tot objecten en/of anderen in de virtuele wereld ondersteunt het leren.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Afstand optimaliseren",
                            description: "Zorg ervoor dat objecten en personen in de virtuele omgeving op een natuurlijke afstand staan die het leren ondersteunt. Houd rekening met het gezichtsveld en de leesbaarheid.",
                            resources: [
                                { title: "VR interface design", url: "#" },
                                { title: "Ergonomie in VR", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M10',
                    text: 'De gebruiker ziet precies zoveel van de virtuele omgeving tegelijk als nodig is voor het leren, niet meer, niet minder.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Informatieverdeling optimaliseren",
                            description: "Toon informatie in behapbare brokken en voorkom overbelasting van het werkgeheugen. Gebruik eventueel een progressieve onthulling van informatie.",
                            resources: [
                                { title: "Cognitieve belasting", url: "#" },
                                { title: "Informatiearchitectuur", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M11',
                    text: 'De omgevingen in de virtuele wereld ondersteunen het leren.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Virtuele omgeving verrijken",
                            description: "Zorg voor een realistische en betekenisvolle virtuele omgeving die aansluit bij de leerdoelen. Voeg relevante elementen toe die het leren ondersteunen.",
                            resources: [
                                { title: "Virtuele leeromgevingen", url: "#" },
                                { title: "Authentieke leeromgevingen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'M12',
                    text: 'De manier waarop de gebruiker deelneemt aan de virtuele wereld ondersteunt het leren. Denk bv. aan een hoge mate van interactie, actief handelen, kennis toepassen in nieuwe contexten.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Interactie verbeteren",
                            description: "Zorg voor betekenisvolle interactiemogelijkheden die bijdragen aan het leerproces. Stimuleer actieve betrokkenheid en het toepassen van kennis.",
                            resources: [
                                { title: "Interactie in VR", url: "#" },
                                { title: "Actief leren", url: "#" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'section4',
            title: 'Deel 4. Effecten',
            description: 'De stellingen in dit laatste deel gaan over de effecten die het gebruik van de applicatie oplevert / kan opleveren.(Outcome)',
            questions: [
                {
                    id: 'O1',
                    text: 'De applicatie zorgt voor een positieve leerervaring.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Leerervaring verrijken",
                            description: "Verzamel feedback van gebruikers om de leerervaring te verbeteren. Besteed aandacht aan zowel cognitieve als affectieve aspecten van het leren.",
                            resources: [
                                { title: "Leerbeleving optimaliseren", url: "#" },
                                { title: "Motivatie verhogen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O2',
                    text: 'De applicatie geeft informatie of het leerdoel is bereikt.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Evaluatie verbeteren",
                            description: "Zorg voor duidelijke criteria en methoden om te bepalen of de leerdoelen zijn behaald. Gebruik hiervoor bijvoorbeeld toetsen, observaties of producten.",
                            resources: [
                                { title: "Toetsen en evalueren", url: "#" },
                                { title: "Leerdoelen toetsen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O3',
                    text: 'De evaluatie past naadloos op het leerdoel. Met andere woorden: bij een kennisdoel is de evaluatie gericht op die kennis; bij een doel rondom emoties is de evaluatie gericht op die emoties, etc.',
                    type: 'likert',
                    recommendations: [
                        {C
                            title: "Evaluatie afstemmen",
                            description: "Zorg voor een nauwe aansluiting tussen de leerdoelen en de evaluatie. Gebruik verschillende soorten evaluatie die passen bij de aard van de leerdoelen.",
                            resources: [
                                { title: "Wat is constructive alignment?", url: "https://vernieuwenderwijs.nl/barend-legt-uit-constructive-alignment-video/" }
                                { title: "Constructive alignment toepassen.", url: "https://www.ru.nl/medewerkers/docenten/onderwijs-ontwerpen/cursussen-ontwerpen/leerdoelen-integreren" },
                            ]
                        }
                    ]
                },
                {
                    id: 'O4',
                    text: 'De applicatie draagt eraan bij concepten, modellen en theorieën makkelijker te begrijpen.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Conceptueel begrip versterken",
                            description: "Gebruik visuele representaties, interactieve simulaties en concrete voorbeelden om abstracte concepten begrijpelijker te maken.",
                            resources: [
                                { title: "Conceptueel leren", url: "#" },
                                { title: "Visualisaties in onderwijs", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O5',
                    text: 'De gebruiker kan met de technologie beheersing van de leerdoelen aantonen die in een traditionele onderwijssetting niet zichtbaar zijn.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Alternatieve beoordelingsvormen",
                            description: "Maak gebruik van de unieke mogelijkheden van de technologie om vaardigheden en inzichten te beoordelen die met traditionele methoden moeilijk te meten zijn.",
                            resources: [
                                { title: "Alternatieve toetsvormen", url: "#" },
                                { title: "Vaardigheden beoordelen", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O6',
                    text: 'De applicatie geeft de leraar (trainer begeleider) voldoende informatie voor het vervolgproces.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Docentinformatie verbeteren",
                            description: "Bied docenten gedetailleerde informatie over de voortgang en prestaties van studenten, zodat zij hun begeleiding hierop kunnen afstemmen.",
                            resources: [
                                { title: "Data-gedreven onderwijs", url: "#" },
                                { title: "Learning analytics", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O7',
                    text: 'Het gebruik van de applicatie levert bijkomende voordelen, zoals veiligheid, kostenreductie, materiaalbeperking e.d.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Meerwaarde benadrukken",
                            description: "Maak expliciet welke voordelen het gebruik van de technologie biedt ten opzichte van traditionele methoden, bijvoorbeeld op het gebied van veiligheid of kosten.",
                            resources: [
                                { title: "Kosten-batenanalyse", url: "#" },
                                { title: "ROI van educatieve technologie", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O8',
                    text: 'De gebruiker ontwikkelt ook generieke vaardigheden die gebruikt worden in de fysieke wereld. Denk aan 21e eeuwse vaardigheden zoals samenwerken met iemand uit een ander vakgebied, misinformatie herkennen of problemen analyseren.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "21e-eeuwse vaardigheden integreren",
                            description: "Benoem expliciet welke generieke vaardigheden worden ontwikkeld en bied mogelijkheden om deze te oefenen en te reflecteren.",
                            resources: [
                                { title: "21e-eeuwse vaardigheden", url: "#" },
                                { title: "Burgerschapsvorming", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O9',
                    text: 'Er zijn geen ongewenste neveneffecten. Denk bv. aan onzorgvuldig handelen waar zorgvuldigheid vereist is, niet-duurzaam handelen o.i.d.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Risico's minimaliseren",
                            description: "Identificeer mogelijke negatieve effecten van het gebruik van de applicatie en neem maatregelen om deze te voorkomen of te beperken.",
                            resources: [
                                { title: "Ethische aspecten van VR", url: "#" },
                                { title: "Veilig gebruik van technologie", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O10',
                    text: 'Het is aannemelijk dat de gebruiker het geleerde in de virtuele wereld ook kan toepassen in vergelijkbare situaties in de fysieke wereld.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Transfer bevorderen",
                            description: "Zorg voor voldoende oefening in verschillende contexten en stimuleer het bewustzijn van overeenkomsten tussen de virtuele en fysieke wereld.",
                            resources: [
                                { title: "Transfer van leren", url: "#" },
                                { title: "Toepassen in nieuwe situaties", url: "#" }
                            ]
                        }
                    ]
                },
                {
                    id: 'O11',
                    text: 'Het is aannemelijk dat de gebruiker het geleerde in de virtuele wereld ook kan toepassen in andere, nieuwe situaties in de fysieke wereld.',
                    type: 'likert',
                    recommendations: [
                        {
                            title: "Generalisatie stimuleren",
                            description: "Bied gevarieerde oefensituaties aan en moedig studenten aan om verbanden te leggen met andere contexten. Gebruik reflectievragen om het generaliseren te bevorderen.",
                            resources: [
                                { title: "Generalisatie in leren", url: "#" },
                                { title: "Dieper leren stimuleren", url: "#" }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    
    // Likert scale options
    likertOptions: [
        { value: 1, label: 'Helemaal oneens' },
        { value: 2, label: 'Oneens' },
        { value: 3, label: 'Niet oneens, niet eens' },
        { value: 4, label: 'Eens' },
        { value: 5, label: 'Helemaal eens' }
    ]
};

// Make the data available globally
if (typeof window !== 'undefined') {
    window.QuestionnaireData = {
        questionnaireData: window.questionnaireData
    };
}

// For Node.js/CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        questionnaireData: window.questionnaireData
    };
}

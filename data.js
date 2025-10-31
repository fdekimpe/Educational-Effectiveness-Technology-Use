// Data object containing all questions for the questionnaire
const questionnaireData = {
    sections: [
        {
            id: 'section1',
            title: 'Deel 1. Doelgerichtheid',
            description: 'Dit deel gaat over doel, doelgroep en aanwijzingen voor gebruik.',
            questions: [
                {
                    id: 'C1',
                    text: 'Het is duidelijk voor welke doelgroep de applicatie is bedoeld (denk aan leeftijd, voorkennis, digitale geletterdheid, niveau etc.).',
                    type: 'likert'
                },
                {
                    id: 'C2',
                    text: 'Er is een helder, concreet beschreven leerdoel, dat begrijpelijk is voor alle betrokkenen (ontwikkelaar, leraar, gebruiker).',
                    type: 'likert'
                },
                {
                    id: 'C3',
                    text: 'Het leerdoel is relevant voor de doelgroep.',
                    type: 'likert'
                },
                {
                    id: 'C4',
                    text: 'Het leerdoel is betekenisvol voor de dagelijkse ervaringen van de doelgroep.',
                    type: 'likert'
                },
                {
                    id: 'C5',
                    text: 'Het leerdoel is haalbaar voor de doelgroep.',
                    type: 'likert'
                },
                {
                    id: 'C6',
                    text: 'De applicatie past bij wat de doelgroep in het algemeen leuk en aantrekkelijk vindt (aansprekende look & feel, aansprekende uitdagingen).',
                    type: 'likert'
                },
                {
                    id: 'C7',
                    text: 'De applicatie is gebruiksvriendelijk voor de doelgroep (denk aan hanteren hardware en navigatie).',
                    type: 'likert'
                },
                {
                    id: 'C8',
                    text: 'De applicatie bevat een instructie voor de gebruikers, ingebouwd of los van de applicatie.',
                    type: 'likert'
                },
                {
                    id: 'C9',
                    text: 'De applicatie bevat aanwijzingen voor reflectie/bespreking met de gebruikers na het gebruik ervan, ingebouwd of los van de applicatie.',
                    type: 'likert'
                },
                {
                    id: 'C10',
                    text: 'De applicatie omvat aanwijzingen voor de didactische rol van de leraar (trainer, begeleider).',
                    type: 'likert'
                },
                {
                    id: 'C11',
                    text: 'De applicatie toont een samenhangende lijn van leerdoel(en), activiteiten, evaluatie en reflectie/bespreking.',
                    type: 'likert'
                }
            ]
        },
        {
            id: 'section2',
            title: 'Deel 2. Didactiek',
            description: 'Het gaat in dit deel om de uitdagingen en inhouden die de gebruiker in de VR-applicatie krijgt aangeboden en de manier waarop dit gebeurt.',
            questions: [
                {
                    id: 'I1',
                    text: 'De technologie heeft een duidelijke meerwaarde voor het leerproces van de gebruiker.',
                    type: 'likert'
                },
                {
                    id: 'I2',
                    text: 'De technologie doet een functioneel beroep op meerdere zintuigen, maar leidt niet af van het leerdoel (spelelement, snufjes, doorkliklinkjes, afleidende \"leuke\" plaatjes, overmatig complexe bediening).',
                    type: 'likert'
                },
                {
                    id: 'I3',
                    text: 'Informatie in de applicatie is volledig, correct en relevant.',
                    type: 'likert'
                },
                {
                    id: 'I4',
                    text: 'Inhoud en activiteiten worden goed gedoseerd aangeboden, in balans met wat de gebruiker aan kan (geen cognitieve overbelasting).',
                    type: 'likert'
                },
                {
                    id: 'I5',
                    text: 'De gebruiker voert activiteiten uit die didactisch verantwoord zijn voor het behalen van het leerdoel.',
                    type: 'likert'
                },
                {
                    id: 'I6',
                    text: 'De gebruiker kan geen activiteiten overslaan die essentieel zijn voor het leerproces.',
                    type: 'likert'
                },
                {
                    id: 'I7',
                    text: 'Voorkennis die de gebruiker nodig heeft, wordt in de applicatie op een actieve wijze geactiveerd.',
                    type: 'likert'
                },
                {
                    id: 'I8',
                    text: 'Voor gebruikers die de voorkennis moeten opfrissen, is er een hulproute (voorinstructie) ingebouwd.',
                    type: 'likert'
                },
                {
                    id: 'I9',
                    text: 'Gebruikers voor wie vakinhouden, handelingen of aanpak nieuw zijn, krijgen hulp in de vorm van (bijvoorbeeld) een stap-voor-stap uitleg, demonstratie, help-screen of concreet voorbeeld.',
                    type: 'likert'
                },
                {
                    id: 'I10',
                    text: 'De hulp die gebruikers krijgen, is aangepast aan het beheersingsniveau: naarmate de gebruiker bekwamer wordt, vermindert de hulp.',
                    type: 'likert'
                },
                {
                    id: 'I11',
                    text: 'Als er sprake is van een leerroute in de applicatie, dan kan de leraar deze op eenvoudige wijze aanpassen qua moeilijkheid en/of tempo.',
                    type: 'likert'
                }
            ]
        },
        {
            id: 'section3',
            title: 'Deel 3. Leermechanismen',
            description: 'Dit deel bevat stellingen over de processen die de applicatie bij de gebruiker in werking zet en hoe dat gebeurt.',
            questions: [
                {
                    id: 'M1',
                    text: 'De activiteiten in de applicatie sturen aan op de noodzakelijke/gewenste leerprocessen.',
                    type: 'likert'
                },
                {
                    id: 'M2',
                    text: 'De technologie zet in het algemeen geen ongewenste neven-processen in werking, zoals het ontstaan van negatieve emoties bij aangrijpende uitdagingen, gevoel van desoriëntatie, motion sickness o.i.d.',
                    type: 'likert'
                },
                {
                    id: 'M3',
                    text: 'De applicatie stimuleert samenwerkend/sociaal leren.',
                    type: 'likert'
                },
                {
                    id: 'M4',
                    text: 'De technologie zorgt voor een andere manier van leren om het leerdoel te behalen dan in traditionele onderwijssettingen.',
                    type: 'likert'
                },
                {
                    id: 'M5',
                    text: 'De technologie geeft de gebruiker inzicht in zijn voortgang/ontwikkeling (feedback via bv. badges, levels).',
                    type: 'likert'
                },
                {
                    id: 'M6',
                    text: 'De gebruiker krijgt feedback waarmee hij/zij leerstrategieën/passende aanpakken aanleert of versterkt.',
                    type: 'likert'
                },
                {
                    id: 'M7',
                    text: 'De mate waarin de gebruiker het gevoel heeft echt aanwezig te zijn in de virtuele wereld ondersteunt het leren.',
                    type: 'likert'
                },
                {
                    id: 'M8',
                    text: 'Het perspectief dat de gebruiker inneemt in de virtuele wereld ondersteunt het leren (vanuit jezelf, vanuit een ander, of vanuit een derde persoon).',
                    type: 'likert'
                },
                {
                    id: 'M9',
                    text: 'De afstand van de gebruiker tot objecten en/of anderen in de virtuele wereld ondersteunt het leren.',
                    type: 'likert'
                },
                {
                    id: 'M10',
                    text: 'De gebruiker ziet precies zoveel van de virtuele omgeving tegelijk als nodig is voor het leren, niet meer, niet minder.',
                    type: 'likert'
                },
                {
                    id: 'M11',
                    text: 'De omgevingen in de virtuele wereld ondersteunen het leren.',
                    type: 'likert'
                },
                {
                    id: 'M12',
                    text: 'De manier waarop de gebruiker deelneemt aan de virtuele wereld ondersteunt het leren. Denk bv. aan een hoge mate van interactie, actief handelen, kennis toepassen in nieuwe contexten.',
                    type: 'likert'
                }
            ]
        },
        {
            id: 'section4',
            title: 'Deel 4. Effecten',
            description: 'De stellingen in dit laatste deel gaan over de effecten die het gebruik van de VR-applicatie oplevert / kan opleveren.',
            questions: [
                {
                    id: 'O1',
                    text: 'De applicatie zorgt voor een positieve leerervaring.',
                    type: 'likert'
                },
                {
                    id: 'O2',
                    text: 'De applicatie geeft informatie of het leerdoel is bereikt.',
                    type: 'likert'
                },
                {
                    id: 'O3',
                    text: 'De evaluatie past naadloos op het leerdoel. Met andere woorden: bij een kennisdoel is de evaluatie gericht op die kennis; bij een doel rondom emoties is de evaluatie gericht op die emoties, etc.',
                    type: 'likert'
                },
                {
                    id: 'O4',
                    text: 'De applicatie draagt eraan bij concepten, modellen en theorieën makkelijker te begrijpen.',
                    type: 'likert'
                },
                {
                    id: 'O5',
                    text: 'De gebruiker kan met de technologie beheersing van de leerdoelen aantonen die in een traditionele onderwijssetting niet zichtbaar zijn.',
                    type: 'likert'
                },
                {
                    id: 'O6',
                    text: 'De applicatie geeft de leraar (trainer begeleider) voldoende informatie voor het vervolgproces.',
                    type: 'likert'
                },
                {
                    id: 'O7',
                    text: 'Het gebruik van de applicatie levert bijkomende voordelen, zoals veiligheid, kostenreductie, materiaalbeperking e.d.',
                    type: 'likert'
                },
                {
                    id: 'O8',
                    text: 'De gebruiker ontwikkelt ook generieke vaardigheden die gebruikt worden in de fysieke wereld. Denk aan 21e eeuwse vaardigheden zoals samenwerken met iemand uit een ander vakgebied, misinformatie herkennen of problemen analyseren.',
                    type: 'likert'
                },
                {
                    id: 'O9',
                    text: 'Er zijn geen ongewenste neveneffecten. Denk bv. aan onzorgvuldig handelen waar zorgvuldigheid vereist is, niet-duurzaam handelen o.i.d.',
                    type: 'likert'
                },
                {
                    id: 'O10',
                    text: 'Het is aannemelijk dat de gebruiker het geleerde in de virtuele wereld ook kan toepassen in vergelijkbare situaties in de fysieke wereld.',
                    type: 'likert'
                },
                {
                    id: 'O11',
                    text: 'Het is aannemelijk dat de gebruiker het geleerde in de virtuele wereld ook kan toepassen in andere, nieuwe situaties in de fysieke wereld.',
                    type: 'likert'
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
    ],
    
    // DICE framework options
    diceOptions: [
        { id: 'diceDangerous', value: 'dangerous', label: 'Dangerous (gevaarlijk)' },
        { id: 'diceImpossible', value: 'impossible', label: 'Impossible (onmogelijk)' },
        { id: 'diceCounterproductive', value: 'counterproductive', label: 'Counterproductive (onwenselijk)' },
        { id: 'diceExpensive', value: 'expensive', label: 'Expensive (te duur)' },
        { id: 'diceNone', value: 'none', label: 'Geen van bovenstaande' }
    ]
};

// Export the data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionnaireData;
}

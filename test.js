// regex replace from google docs sheet, escape `'` first
// find:
// ^([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)$
// replace:
// {id:'$1',formId:0x$2,name:'$3',stages:[$4],fame:$5,url:'$6'},
const quests = [
    {id:'MQ01',formId:0x0001E723,name:'Tutorial',stages:[84, 100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Tutorial'},
    {id:'MQ02',formId:0x0001E724,name:'Deliver the Amulet',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Deliver_the_Amulet'},
    {id:'MQ03',formId:0x0001E725,name:'Find the Heir',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Find_the_Heir'},
    {id:'MS48',formId:0x000224D8,name:'Breaking the Siege of Kvatch',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Breaking_the_Siege_of_Kvatch'},
    {id:'MS49',formId:0x00028C72,name:'The Battle for Castle Kvatch',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Battle_for_Castle_Kvatch'},
    {id:'MQ04',formId:0x0001E726,name:'Weynon Priory',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Weynon_Priory_(quest)'},
    {id:'MQ05',formId:0x0001E727,name:'The Path of Dawn',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Path_of_Dawn'},
    {id:'MQ06',formId:0x0001E728,name:'Dagon Shrine',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Dagon_Shrine'},
    {id:'MQ07',formId:0x0001E729,name:'Spies',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Spies'},
    {id:'MQ08',formId:0x0001E72A,name:'Blood of the Daedra',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blood_of_the_Daedra'},
    {id:'MQ09',formId:0x0001E72B,name:'Blood of the Divines',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blood_of_the_Divines'},
    {id:'MQ10',formId:0x0001E72C,name:'Bruma Gate',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Bruma_Gate'},
    {id:'MQ11',formId:0x0001E72D,name:'Allies for Bruma',stages:[100],fame:7,url:'https://en.uesp.net/wiki/Oblivion:Allies_for_Bruma'},
    {id:'MQ12',formId:0x0001E72E,name:'Miscarcand',stages:[100],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Miscarcand_(quest)'},
    {id:'MQ13',formId:0x0001E72F,name:'Defense of Bruma',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Defense_of_Bruma'},
    {id:'MQ14',formId:0x0001E730,name:'Great Gate',stages:[100],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Great_Gate'},
    {id:'MQ15',formId:0x0000C20B,name:'Paradise',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Paradise'},
    {id:'MQ16',formId:0x0002A38F,name:'Light the Dragonfires',stages:[100],fame:3,url:'https://en.uesp.net/wiki/Oblivion:Light_the_Dragonfires'},
    {id:'MQDragonArmor',formId:0x000ADE3F,name:'Imperial Dragon Armor',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Imperial_Dragon_Armor'},
    {id:'Dark01Knife',formId:0x000224EB,name:'A Knife in the Dark',stages:[100, 115],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Knife_in_the_Dark'},
    {id:'DarkExile',formId:0x00026DE0,name:'A Dark Exile',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Dark_Exile'},
    {id:'DarkExile2',formId:0x00026DE1,name:'Another Dark Exile',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Dark_Exile'},
    {id:'MSShadowscale',formId:0x00035589,name:'The Renegade Shadowscale',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Renegade_Shadowscale'},
    {id:'DarkVamp',formId:0x0004CE4C,name:'Darkness Eternal',stages:[115, 116],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Darkness_Eternal'},
    {id:'Dark01KnifeFIN',formId:0x00023DD6,name:'Welcome to the Family',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Watery_Grave#Welcome_to_the_Family'},
    {id:'Dark02Watery',formId:0x000232CF,name:'A Watery Grave',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Watery_Grave'},
    {id:'Dark02WateryFIN',formId:0x000232D0,name:'Blood of the Damned',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Accidents_Happen#Blood_of_the_Damned'},
    {id:'Dark03Accidents',formId:0x000232D1,name:'Accidents Happen',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Accidents_Happen'},
    {id:'Dark03AccidentsFIN',formId:0x000232D4,name:'No Rest for the Wicked',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Scheduled_for_Execution#No_Rest_for_the_Wicked'},
    {id:'Dark04Execution',formId:0x000239E1,name:'Scheduled for Execution',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Scheduled_for_Execution'},
    {id:'Dark04ExecutionFIN',formId:0x00023DD7,name:'To Serve Sithis',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Assassinated_Man#To_Serve_Sithis'},
    {id:'Dark05Assassinated',formId:0x000253B9,name:'The Assassinated Man',stages:[100, 110],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Assassinated_Man'},
    {id:'Dark05AssassinatedFIN',formId:0x000253BA,name:'My Brother\'s Keeper',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Lonely_Wanderer#My_Brother.27s_Keeper'},
    {id:'Dark06Wanderer',formId:0x000253BB,name:'The Lonely Wanderer',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Lonely_Wanderer'},
    {id:'Dark06WandererFIN',formId:0x000253BC,name:'Enter the Eliminator',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bad_Medicine#Enter_the_Eliminator'},
    {id:'Dark07Medicine',formId:0x000253BD,name:'Bad Medicine',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bad_Medicine'},
    {id:'Dark07MedicineFIN',formId:0x000253BE,name:'The Night Mother\'s Child',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Whodunit%3F#The_Night_Mother.27s_Child'},
    {id:'Dark08Whodunit',formId:0x000253BF,name:'Whodunit?',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Whodunit%3F'},
    {id:'Dark08WhodunitFIN',formId:0x000253C0,name:'The Assassin\'s Gambit',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Permanent_Retirement#The_Assassin.27s_Gambit'},
    {id:'Dark09Retirement',formId:0x000253C1,name:'Permanent Retirement',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Permanent_Retirement'},
    {id:'Dark09RetirementFIN',formId:0x000253C2,name:'Of Secret and Shadow',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Purification#Of_Secret_And_Shadow'},
    {id:'Dark10Sanctuary',formId:0x0002FF1C,name:'The Purification',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Purification'},
    {id:'Dark10SanctuaryFIN',formId:0x00030203,name:'The Dead Drop',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Affairs_of_a_Wizard#The_Dead_Drop'},
    {id:'Dark10SpecialWizard',formId:0x00007BF2,name:'Affairs of a Wizard',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Affairs_of_a_Wizard'},
    {id:'Dark11Kin',formId:0x0003005F,name:'Next of Kin',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Next_of_Kin'},
    {id:'Dark12Harem',formId:0x0002FF1E,name:'Broken Vows',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Broken_Vows'},
    {id:'Dark13Justice',formId:0x0002FF20,name:'Final Justice',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Final_Justice'},
    {id:'Dark14Honor',formId:0x0002FF22,name:'A Matter of Honor',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Matter_of_Honor'},
    {id:'Dark15Coldest',formId:0x0002FF24,name:'The Coldest Sleep',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Coldest_Sleep'},
    {id:'Dark16Kiss',formId:0x0002FF26,name:'A Kiss Before Dying',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Kiss_Before_Dying'},
    {id:'Dark17Following',formId:0x00030060,name:'Following a Lead',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Following_a_Lead'},
    {id:'Dark18Mother',formId:0x00030062,name:'Honor Thy Mother',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Honor_Thy_Mother'},
    {id:'FGD00JoinFG',formId:0x00024298,name:'Join the Fighters Guild',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Fighters_Guild#Joining'},
    {id:'FGC01Rats',formId:0x00035713,name:'A Rat Problem',stages:[100, 110, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Rat_Problem'},
    {id:'FGC02Protect',formId:0x00035714,name:'The Unfortunate Shopkeeper',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Unfortunate_Shopkeeper'},
    {id:'FGC06Courier',formId:0x00027F8E,name:'The Desolate Mine',stages:[100, 110],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Desolate_Mine'},
    {id:'FGD01Default',formId:0x00024297,name:'Unfinished Business',stages:[100, 105],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Unfinished_Business'},
    {id:'FGD02DandD',formId:0x0002429C,name:'Drunk and Disorderly',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Drunk_and_Disorderly'},
    {id:'FGC03Thieves',formId:0x00035715,name:'Den of Thieves',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Den_of_Thieves'},
    {id:'FGC07Heirloom',formId:0x00035718,name:'Amelion\'s Debt',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Amelion%27s_Debt'},
    {id:'FGD03Viranus',formId:0x0002D154,name:'The Master\'s Son',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Master%27s_Son'},
    {id:'FGD04Defector',formId:0x0002D71A,name:'More Unfinished Business',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:More_Unfinished_Business'},
    {id:'FGD05Oreyn',formId:0x0002D71B,name:'Azani Blackheart',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Azani_Blackheart_(quest)'},
    {id:'FGC04Scholar',formId:0x0035716,name:'The Wandering Scholar',stages:[100, 110],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Wandering_Scholar'},
    {id:'FGC08Prison',formId:0x00035719,name:'The Fugitives',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Fugitives'},
    {id:'FGD06DeadViranus',formId:0x0002D71C,name:'Trolls of Forsaken Mine',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Trolls_of_Forsaken_Mine'},
    {id:'FGC05Stone',formId:0x00035717,name:'The Stone of St. Alessia',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Stone_of_St._Alessia'},
    {id:'FGC09Ogres',formId:0x0003571A,name:'The Noble\'s Daughter',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Noble%27s_Daughter'},
    {id:'FGC10Swamp',formId:0x0003571B,name:'Mystery at Harlun\'s Watch',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Mystery_at_Harlun%27s_Watch'},
    {id:'FGD07Kidnap',formId:0x000356C8,name:'Information Gathering',stages:[100, 105],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Information_Gathering'},
    {id:'FGD08Infiltration',formId:0x000356C9,name:'Infiltration',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Infiltration'},
    {id:'FGD09Hist',formId:0x000356CA,name:'The Hist',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Hist'},
    {id:'MG00Join',formId:0x0002CD10,name:'Join the Mages Guild',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Join_the_Mages_Guild'},
    {id:'MG03Illusion',formId:0x0002D936,name:'Bravil Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Bravil_Recommendation'},
    {id:'MG07Leyawiin',formId:0x0002D93C,name:'Leyawiin Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Leyawiin_Recommendation'},
    {id:'MG02Alter',formId:0x0002D410,name:'Cheydinhal Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Cheydinhal_Recommendation'},
    {id:'MG05Fingers',formId:0x000224E1,name:'Fingers of the Mountain',stages:[100, 200],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Fingers_of_the_Mountain'},
    {id:'MG05A',formId:0x00028C05,name:'Fingers of the Mountain, Part II',stages:[200, 255],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Fingers_of_the_Mountain#Fingers_of_the_Mountain.2C_Part_II'},
    {id:'MG06Bruma',formId:0x0002CBC8,name:'Bruma Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Bruma_Recommendation'},
    {id:'MG01Destruct',formId:0x0002D28B,name:'Skingrad Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Skingrad_Recommendation'},
    {id:'MG04Restore',formId:0x0002D32B,name:'Anvil Recommendation',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Anvil_Recommendation'},
    {id:'MGExpulsion01',formId:0x00022E92,name:'Mages Guild Suspension',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mages_Guild_Suspension'},
    {id:'MGExpulsion02',formId:0x00025032,name:'Mages Guild Second Suspension',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mages_Guild_Suspension#Second_Offense'},
    {id:'MG19Alchemy',formId:0x000A78CE,name:'Alchemy Acquisitions',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Alchemy_Acquisitions'},
    {id:'MG08MagesStaff',formId:0x00034E14,name:'A Mage\'s Staff',stages:[100],fame:2,url:'https://en.uesp.net/wiki/Oblivion:A_Mage%27s_Staff'},
    {id:'MG09Motives',formId:0x0003564F,name:'Ulterior Motives',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Ulterior_Motives'},
    {id:'MG10Vahtacen',formId:0x00035F28,name:'Vahtacen\'s Secret',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Vahtacen%27s_Secret'},
    {id:'MG11NecroMoon',formId:0x00036300,name:'Necromancer\'s Moon',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Necromancer%27s_Moon'},
    {id:'MG12Gate',formId:0x0000395F,name:'Liberation or Apprehension?',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Liberation_or_Apprehension%3F'},
    {id:'MG13Information',formId:0x00003960,name:'Information at a Price',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Information_at_a_Price'},
    {id:'MG14Plot',formId:0x00003961,name:'A Plot Revealed',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Plot_Revealed'},
    {id:'MG15Helm',formId:0x0000C039,name:'The Bloodworm Helm',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Bloodworm_Helm'},
    {id:'MG16Amulet',formId:0x0000C03A,name:'The Necromancer\'s Amulet',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Necromancer%27s_Amulet'},
    {id:'MG17Ambush',formId:0x0000C03B,name:'Ambush',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Ambush'},
    {id:'MG18KingofWorms',formId:0x0000C03C,name:'Confront the King',stages:[100],fame:3,url:'https://en.uesp.net/wiki/Oblivion:Confront_the_King'},
    {id:'DAAzura',formId:0x000146A2,name:'Azura',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Azura'},
    {id:'DABoethia',formId:0x000146A3,name:'Boethia',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Boethia'},
    {id:'DAClavicusVile',formId:0x000146A4,name:'Clavicus Vile',stages:[100, 105],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Clavicus_Vile'},
    {id:'DAHermaeusMora',formId:0x000146AF,name:'Hermaeus Mora',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Hermaeus_Mora'},
    {id:'DAHircine',formId:0x000146A5,name:'Hircine',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Hircine'},
    {id:'DAMalacath',formId:0x000146A6,name:'Malacath',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Malacath'},
    {id:'DAMephala',formId:0x000146A7,name:'Mephala',stages:[100, 105, 110, 115],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Mephala'},
    {id:'DAMeridia',formId:0x000146A8,name:'Meridia',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Meridia'},
    {id:'DAMolagBal',formId:0x000146B0,name:'Molag Bal',stages:[100, 105, 110],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Molag_Bal'},
    {id:'DANamira',formId:0x000146A9,name:'Namira',stages:[100, 105, 110],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Namira'},
    {id:'DANocturnal',formId:0x000146AA,name:'Nocturnal',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Nocturnal'},
    {id:'DAPeryite',formId:0x000146AB,name:'Peryite',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Peryite'},
    {id:'DASanguine',formId:0x000146AC,name:'Sanguine',stages:[100, 105],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Sanguine'},
    {id:'DASheogorath',formId:0x000146AD,name:'Sheogorath',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Sheogorath'},
    {id:'DAVaermina',formId:0x000146AE,name:'Vaermina',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Vaermina'},
    {id:'TG00FindThievesGuild',formId:0x000355DF,name:'Finding the Thieves Guild',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Finding_the_Thieves_Guild'},
    {id:'TG01BestThief',formId:0x000355E1,name:'May the Best Thief Win',stages:[50, 90],fame:0,url:'https://en.uesp.net/wiki/Oblivion:May_the_Best_Thief_Win'},
    {id:'TG01BloodPrice',formId:0x000BF021,name:'Blood Price (TG01)',stages:[18],fame:0,url:'https://en.uesp.net/wiki/Oblivion:May_the_Best_Thief_Win#Blood_Price'},
    {id:'TGStolenGoods',formId:0x0001EE46,name:'Independent Thievery',stages:[120],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Independent_Thievery'},
    {id:'TG02taxes',formId:0x0003486D,name:'Untaxing the Poor',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Untaxing_the_Poor'},
    {id:'TG03Elven',formId:0x00034EA2,name:'The Elven Maiden',stages:[80],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Elven_Maiden'},
    {id:'TG03BloodPrice',formId:0x000BF024,name:'Blood Price (TG03)',stages:[35],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Elven_Maiden#Blood_Price'},
    {id:'TG04Mistake',formId:0x00035DE0,name:'Ahdarji\'s Heirloom',stages:[80],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Ahdarji%27s_Heirloom'},
    {id:'TG04BloodPrice',formId:0x000BF01C,name:'Blood Price (TG04)',stages:[45],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Ahdarji%27s_Heirloom#Blood_Price'},
    {id:'TG05Misdirection',formId:0x00036332,name:'Misdirection',stages:[60],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Misdirection'},
    {id:'TG05BloodPrice',formId:0x000BF01D,name:'Blood Price (TG05)',stages:[55],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Misdirection#Blood_Price'},
    {id:'TG06Atonement',formId:0x00036333,name:'Lost Histories',stages:[70],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Lost_Histories'},
    {id:'TG06BloodPrice',formId:0x000BF01E,name:'Blood Price (TG06)',stages:[65],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Lost_Histories#Blood_Price'},
    {id:'TG07Lex',formId:0x00036334,name:'Taking Care of Lex',stages:[90],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Taking_Care_of_Lex'},
    {id:'TG07BloodPrice',formId:0x000BF020,name:'Blood Price (TG07)',stages:[75],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Taking_Care_of_Lex#Blood_Price'},
    {id:'TG08Blind',formId:0x00036335,name:'Turning a Blind Eye',stages:[50, 100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Turning_a_Blind_Eye'},
    {id:'TG08BloodPrice',formId:0x000BF022,name:'Blood Price (TG08)',stages:[85],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Turning_a_Blind_Eye#Blood_Price'},
    {id:'TG09Arrow',formId:0x00036336,name:'Arrow of Extrication',stages:[40, 50],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Arrow_of_Extrication'},
    {id:'TG09BloodPrice',formId:0x000BF023,name:'Blood Price (TG09)',stages:[95],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Arrow_of_Extrication#Blood_Price'},
    {id:'TG10Boots',formId:0x00036337,name:'Boots of Springheel Jak',stages:[50, 60],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Boots_of_Springheel_Jak'},
    {id:'TG10BloodPrice',formId:0x000BF025,name:'Blood Price (TG10)',stages:[105],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Boots_of_Springheel_Jak#Blood_Price'},
    {id:'TG11Heist',formId:0x00036338,name:'The Ultimate Heist',stages:[160, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Ultimate_Heist'},
    {id:'TrainingAcrobatics',formId:0x0018BA2B,name:'Acrobatics Training',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Acrobatics_Training'},
    {id:'TrainingAlchemy',formId:0x0018BA2A,name:'Alchemy Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Alchemy_Training'},
    {id:'TrainingAlteration',formId:0x0018BA2C,name:'Alteration Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Alteration_Training'},
    {id:'TrainingArmorer',formId:0x0018BA2D,name:'Armorer Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Armorer_Training'},
    {id:'TrainingAthletics',formId:0x0018BA2E,name:'Athletics Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Athletics_Training'},
    {id:'TrainingBlade',formId:0x0018BA2F,name:'Blade Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blade_Training'},
    {id:'TrainingBlock',formId:0x0018BA30,name:'Block Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Block_Training'},
    {id:'TrainingBlunt',formId:0x0018BA31,name:'Blunt Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Blunt_Training'},
    {id:'TrainingConjuration',formId:0x0018BA32,name:'Conjuration Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Conjuration_Training'},
    {id:'TrainingDestruction',formId:0x0018B197,name:'Destruction Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Destruction_Training'},
    {id:'TrainingHandtoHand',formId:0x0018BA33,name:'Hand to Hand Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Hand_to_Hand_Training'},
    {id:'TrainingHeavyArmor',formId:0x0018B2F9,name:'Heavy Armor Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Heavy_Armor_Training'},
    {id:'TrainingIllusion',formId:0x0018BA34,name:'Illusion Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Illusion_Training'},
    {id:'TrainingLightArmor',formId:0x0018BA35,name:'Light Armor Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Light_Armor_Training'},
    {id:'TrainingMarksman',formId:0x0003C168,name:'Marksman Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Marksman_Training'},
    {id:'TrainingMercantile',formId:0x0018BA36,name:'Mercantile Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mercantile_Training'},
    {id:'TrainingMysticism',formId:0x0018BA37,name:'Mysticism Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Mysticism_Training'},
    {id:'TrainingRestoration',formId:0x0018BA38,name:'Restoration Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Restoration_Training'},
    {id:'TrainingSecurity',formId:0x0018BA39,name:'Security Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Security_Training'},
    {id:'TrainingSneak',formId:0x0018BA3A,name:'Sneak Training',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Sneak_Training'},
    {id:'TrainingSpeechcraft',formId:0x0018BA3B,name:'Speechcraft Training',stages:[100, 200, 255],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Speechcraft_Training'},
    {id:'SQ08',formId:0x00185FED,name:'A Venerable Vintage',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:A_Venerable_Vintage'},
    {id:'SQ06',formId:0x00185FEB,name:'Bear Season',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bear_Season'},
    {id:'SQ09',formId:0x00185FEE,name:'Go Fish',stages:[100, 110, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Go_Fish'},
    {id:'MS46',formId:0x00007B2E,name:'Goblin Trouble',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Goblin_Trouble'},
    {id:'SQ04',formId:0x00185FE9,name:'No Stone Unturned',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:No_Stone_Unturned'},
    {id:'SQ03',formId:0x00185FE8,name:'Revenge Served Cold',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Revenge_Served_Cold'},
    {id:'SQ05',formId:0x00185FEA,name:'The Gravefinder\'s Repose',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Gravefinder%27s_Repose'},
    {id:'SQ01',formId:0x00177A31,name:'The Potato Snatcher',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Potato_Snatcher'},
    {id:'SQ07',formId:0x00185FEC,name:'The Sunken One',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Sunken_One_(quest)'},
    {id:'SQ10',formId:0x00185FEF,name:'When the Vow Breaks',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:When_the_Vow_Breaks'},
    {id:'MS47',formId:0x0002F86B,name:'Zero Visibility',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Zero_Visibility'},
    {id:'FGC03Flagon',formId:0x00002E60,name:'Newheim\'s Flagon',stages:[95],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Den_of_Thieves#Newheim.27s_Flagon'},
    {id:'MS02',formId:0x0003636F,name:'Where Spirits Have Lease',stages:[120],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Where_Spirits_Have_Lease'},
    {id:'MS04',formId:0x0003AF05,name:'The Siren\'s Deception',stages:[100, 110, 150],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Siren%27s_Deception'},
    {id:'MS93',formId:0x00095A68,name:'The Ghost Ship of Anvil',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Ghost_Ship_of_Anvil'},
    {id:'MS08',formId:0x0001F426,name:'Caught in the Hunt',stages:[100, 150],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Caught_in_the_Hunt'},
    {id:'MS05',formId:0x0002CA50,name:'Through A Nightmare, Darkly',stages:[90, 100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Through_A_Nightmare,_Darkly'},
    {id:'MS06',formId:0x00033E93,name:'The Forlorn Watchman',stages:[120],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Forlorn_Watchman_(quest)'},
    {id:'HouseBravil',formId:0x00085480,name:'Buying a house in Bravil',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bravil_House_for_Sale'},
    {id:'MS09',formId:0x00017837,name:'Two Sides of the Coin',stages:[100, 160, 180, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Two_Sides_of_the_Coin'},
    {id:'MS11',formId:0x00017839,name:'A Brotherhood Betrayed',stages:[120, 170, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Brotherhood_Betrayed'},
    {id:'MS12',formId:0x00017835,name:'Lifting the Vale',stages:[150],fame:2,url:'https://en.uesp.net/wiki/Oblivion:Lifting_the_Vale'},
    {id:'HouseBruma',formId:0x00085481,name:'Buying a house in Bruma',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Bruma_House_for_Sale'},
    {id:'MS14',formId:0x00017606,name:'A Brush with Death',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Brush_with_Death'},
    {id:'HouseCheydinhal',formId:0x00085483,name:'Buying a house in Cheydinhal',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Houses#Cheydinhal'},
    {id:'MS10',formId:0x00017838,name:'Corruption and Conscience',stages:[100, 180, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Corruption_and_Conscience'},
    {id:'MS13',formId:0x00031B77,name:'The Wayward Knight',stages:[100, 105, 110, 115, 150, 200],fame:2,url:'https://en.uesp.net/wiki/Oblivion:The_Wayward_Knight'},
    {id:'MS18',formId:0x000224C7,name:'The Killing Field',stages:[100, 120, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Killing_Field'},
    {id:'MS16',formId:0x00023E85,name:'Separated at Birth',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Separated_at_Birth'},
    {id:'MS16A',formId:0x0002B8DB,name:'Legacy Lost',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Legacy_Lost'},
    {id:'MS16B',formId:0x0002BA46,name:'Sins of the Father',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Sins_of_the_Father'},
    {id:'MS45',formId:0x00027815,name:'A Shadow Over Hackdirt',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:A_Shadow_Over_Hackdirt'},
    {id:'MS51',formId:0x0003151E,name:'Canvas the Castle',stages:[100, 150, 220],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Canvas_the_Castle'},
    {id:'HouseChorrol',formId:0x00085482,name:'Buying a house in Chorrol',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Arborwatch'},
    {id:'HouseImperialCity',formId:0x00085485,name:'Buy a house in the Imperial City',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Shack_for_Sale'},
    {id:'MS29',formId:0x00016718,name:'Unfriendly Competition',stages:[150, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Unfriendly_Competition'},
    {id:'MS21',formId:0x0002AB4A,name:'The Collector',stages:[60, 100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:The_Collector'},
    {id:'MS22',formId:0x0002B19E,name:'Nothing You Can Possess',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Nothing_You_Can_Possess'},
    {id:'MS27',formId:0x0002E5BE,name:'Secrets of the Ayleids',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Secrets_of_the_Ayleids'},
    {id:'MS23',formId:0x0001D21C,name:'Order of the Virtuous Blood',stages:[160, 200, 250],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Order_of_the_Virtuous_Blood_(quest)'},
    {id:'MS26',formId:0x00035CA8,name:'Imperial Corruption',stages:[91, 119],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Imperial_Corruption'},
    {id:'MS31',formId:0x0000C1B8,name:'An Unexpected Voyage',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:An_Unexpected_Voyage'},
    {id:'MS52',formId:0x00038ED6,name:'Origin of the Gray Prince',stages:[100, 115],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Origin_of_the_Gray_Prince'},
    {id:'MS40',formId:0x0003E933,name:'Vampire Cure',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Vampire_Cure'},
    {id:'SQ02',formId:0x00181C6B,name:'Raid on Greyland',stages:[100, 200],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Raid_on_Greyland'},
    {id:'MS37',formId:0x00022E5A,name:'Tears of the Savior',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Tears_of_the_Savior'},
    {id:'MS43',formId:0x00035A95,name:'Whom Gods Annoy',stages:[100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Whom_Gods_Annoy'},
    {id:'MS91',formId:0x0008596C,name:'Mazoga the Orc',stages:[100, 200, 210],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Mazoga_the_Orc_(quest)'},
    {id:'MS92',formId:0x0008596D,name:'Knights of the White Stallion',stages:[100, 105, 110],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Knights_of_the_White_Stallion_(quest)'},
    {id:'HouseLeyawiin',formId:0x0008547F,name:'Buying a house in Leyawiin',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Houses#Leyawiin'},
    {id:'MS38',formId:0x00028D83,name:'Paranoia',stages:[9, 54, 65, 70, 81, 82, 100],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Paranoia'},
    {id:'HouseSkingrad',formId:0x00085484,name:'Buying a house in Skringrad',stages:[30],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Buying_a_house_in_Skingrad'},
    {id:'HouseServant',formId:0x000B97DD,name:'Helping Hands',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:Helping_Hands'},
    {id:'HouseSkingradQuest',formId:0x000B6C0C,name:'The Rosethorn Cache',stages:[100],fame:0,url:'https://en.uesp.net/wiki/Oblivion:The_Rosethorn_Cache'},
    {id:'MS39',formId:0x0004E936,name:'Seeking Your Roots',stages:[100, 200],fame:1,url:'https://en.uesp.net/wiki/Oblivion:Seeking_Your_Roots'},
];
const locs = [
    {"name":"Atrene Camp","approxX":-198683,"approxY":-6236,"x":-198683.375,"y":-6236.9453125,"z":4376,"formId":0x000175fb},
    {"name":"Varus Camp","approxX":-182337,"approxY":26619,"x":-182336.640625,"y":26619.6328125,"z":5245.7900390625,"formId":0x000175e3},
    {"name":"Bodean Camp","approxX":-174144,"approxY":6144,"x":-174144,"y":6144,"z":6157.33984375,"formId":0x000175f5},
    {"name":"Last Chance Camp","approxX":-171101,"approxY":36236,"x":-171101.140625,"y":36235.875,"z":8106.0166015625,"formId":0x0017cf9e},
    {"name":"Troll Candle Camp","approxX":-158325,"approxY":-38769,"x":-158324.75,"y":-38769.46484375,"z":3088.58349609375,"formId":0x000175f7},
    {"name":"Camp Ales","approxX":-147334,"approxY":29756,"x":-147334.265625,"y":29756.009765625,"z":12671.814453125,"formId":0x000175f3},
    {"name":"Mortal Camp","approxX":-129277,"approxY":-21857,"x":-129277.359375,"y":-21857.94921875,"z":7074.98095703125,"formId":0x000175cd},
    {"name":"Gnoll's Meeting Camp","approxX":-118286,"approxY":-15430,"x":-118285.6796875,"y":-15430.2451171875,"z":4960.5126953125,"formId":0x00181c32},
    {"name":"Dagny's Camp","approxX":-116801,"approxY":18427,"x":-116800.640625,"y":18427.6328125,"z":7688,"formId":0x000175f9},
    {"name":"Ra'sava Camp","approxX":-112897,"approxY":-6157,"x":-112897.4296875,"y":-6157.3271484375,"z":7182.25390625,"formId":0x000175f1},
    {"name":"Brotch Camp","approxX":-112775,"approxY":44241,"x":-112775.1171875,"y":44241.81640625,"z":12690.37109375,"formId":0x000175e1},
    {"name":"Valley View Camp","approxX":-100289,"approxY":39285,"x":-100288.671875,"y":39285.1796875,"z":13344,"formId":0x000175eb},
    {"name":"Fat Ramp Camp","approxX":-84175,"approxY":-2392,"x":-84175.1640625,"y":-2392.25341796875,"z":6821.49853515625,"formId":0x00181c31},
    {"name":"gro-Bak Camp","approxX":-41650,"approxY":-2911,"x":-41650.765625,"y":-2911.6630859375,"z":5418.310546875,"formId":0x000175ef},
    {"name":"Collarbone Camp","approxX":-29384,"approxY":-4940,"x":-29384.01171875,"y":-4940.2119140625,"z":7095.74462890625,"formId":0x00181c2f},
    {"name":"Sweetwater Camp","approxX":43872,"approxY":18081,"x":43872.22265625,"y":18081.267578125,"z":1888,"formId":0x000175df},
    {"name":"Bawnwatch Camp","approxX":83645,"approxY":-47010,"x":83644.953125,"y":-47010.578125,"z":353.95703125,"formId":0x00071310},
    {"name":"Hidden Camp","approxX":91509,"approxY":133724,"x":91509.8203125,"y":133724.4375,"z":25408,"formId":0x000175d3},
    {"name":"Fisherman's Rock","approxX":96008,"approxY":-108157,"x":96008.3046875,"y":-108156.96875,"z":771.939453125,"formId":0x00086076},
    {"name":"Crestbridge Camp","approxX":107565,"approxY":12612,"x":107564.640625,"y":12611.9072265625,"z":502.7273864746094,"formId":0x000177b2},
    {"name":"Wind Range Camp","approxX":112423,"approxY":108220,"x":112423.1015625,"y":108219.8515625,"z":9520,"formId":0x000175d1},
    {"name":"Bogwater","approxX":124394,"approxY":-170500,"x":124394.234375,"y":-170500.171875,"z":2657.044921875,"formId":0x00093480},
    {"name":"Walker Camp","approxX":129239,"approxY":125072,"x":129239.2890625,"y":125071.671875,"z":16799.41015625,"formId":0x000175e9},
    {"name":"Aerin's Camp","approxX":131470,"approxY":135656,"x":131469.59375,"y":135656.015625,"z":19289.1640625,"formId":0x0017cf9c},
    {"name":"Trossan Camp","approxX":132763,"approxY":10263,"x":132762.515625,"y":10263.9375,"z":6472,"formId":0x000175db},
    {"name":"Carbo's Camp","approxX":133362,"approxY":64225,"x":133362.4375,"y":64225.70703125,"z":1539.5439453125,"formId":0x000175d7},
    {"name":"Black Dog Camp","approxX":140721,"approxY":-55958,"x":140721.4375,"y":-55958.7109375,"z":576,"formId":0x000175e5},
    {"name":"Sercen Camp","approxX":141209,"approxY":42571,"x":141209.328125,"y":42570.95703125,"z":5710.841796875,"formId":0x0017cf9f},
    {"name":"Marsh-Punk Camp","approxX":157524,"approxY":-70683,"x":157524.109375,"y":-70683.4765625,"z":3737.615234375,"formId":0x000175ed},
    {"name":"Seran Camp","approxX":168931,"approxY":-70622,"x":168931.015625,"y":-70622.84375,"z":1786.860595703125,"formId":0x0017cf9d},
    {"name":"Nayon Camp","approxX":173366,"approxY":-18930,"x":173366.40625,"y":-18930.095703125,"z":1656,"formId":0x000175dd},
    {"name":"Garnet Camp","approxX":181586,"approxY":-51958,"x":181585.546875,"y":-51958.0390625,"z":4816,"formId":0x000175e7},
    {"name":"Hrota Cave","approxX":-194969,"approxY":-18042,"x":-194969.234375,"y":-18042.4609375,"z":3730.38427734375,"formId":0x0001570b},
    {"name":"Brittlerock Cave","approxX":-169133,"approxY":12775,"x":-169132.578125,"y":12774.4716796875,"z":5793.453125,"formId":0x0001589a},
    {"name":"Smoke Hole Cave","approxX":-165884,"approxY":-35925,"x":-165883.546875,"y":-35925.1015625,"z":3818.081787109375,"formId":0x00015a38},
    {"name":"Mongrel's Tooth Cave","approxX":-135234,"approxY":27317,"x":-135233.5625,"y":27316.744140625,"z":9280.396484375,"formId":0x00015a33},
    {"name":"Sandstone Cavern","approxX":-128939,"approxY":-288,"x":-128938.71875,"y":-287.5042724609375,"z":7263.8828125,"formId":0x0001598a},
    {"name":"Fyrelight Cave","approxX":-97074,"approxY":-5029,"x":-97074.3046875,"y":-5028.591796875,"z":5509.0693359375,"formId":0x000158be},
    {"name":"Broken Promises Cave","approxX":-95053,"approxY":74305,"x":-95053.0703125,"y":74304.5546875,"z":13245.6845703125,"formId":0x000ad393},
    {"name":"Fallen Rock Cave","approxX":-91587,"approxY":22387,"x":-91586.765625,"y":22386.779296875,"z":7027.6552734375,"formId":0x000158bf},
    {"name":"Wind Cave","approxX":-90128,"approxY":59840,"x":-90128,"y":59840,"z":11217.416015625,"formId":0x000644fd},
    {"name":"Rock Bottom Caverns","approxX":-84728,"approxY":55264,"x":-84727.84375,"y":55263.828125,"z":11170.482421875,"formId":0x0002a829},
    {"name":"Bleak Flats Cave","approxX":-77127,"approxY":22828,"x":-77127.328125,"y":22828.4140625,"z":6269.29052734375,"formId":0x00048996},
    {"name":"Black Rock Caverns","approxX":-75134,"approxY":109759,"x":-75133.8046875,"y":109759.3046875,"z":16321.6142578125,"formId":0x0001598e},
    {"name":"Nonwyll Cavern","approxX":-69353,"approxY":118006,"x":-69353.03125,"y":118006.0625,"z":18932.5546875,"formId":0x00015902},
    {"name":"Goblin Jim's Cave","approxX":-67654,"approxY":29199,"x":-67654.390625,"y":29198.474609375,"z":6706.4873046875,"formId":0x00015a27},
    {"name":"Redguard Valley Cave","approxX":-60543,"approxY":50291,"x":-60543.46875,"y":50290.5,"z":8832.4755859375,"formId":0x0002aa16},
    {"name":"Serpent Hollow Cave","approxX":-56423,"approxY":55978,"x":-56423.16796875,"y":55977.51171875,"z":10993.65625,"formId":0x000159f9},
    {"name":"Bloodcrust Cavern","approxX":-56070,"approxY":-2018,"x":-56069.57421875,"y":-2018.3338623046875,"z":6853.00146484375,"formId":0x00015708},
    {"name":"Shadow's Rest Cavern","approxX":-43796,"approxY":120585,"x":-43795.73828125,"y":120584.6953125,"z":17295.7734375,"formId":0x00015a31},
    {"name":"Grayrock Cave","approxX":-39729,"approxY":17862,"x":-39729.0234375,"y":17862.185546875,"z":3535.8623046875,"formId":0x00015701},
    {"name":"Howling Cave","approxX":-33713,"approxY":-2658,"x":-33713.51171875,"y":-2657.66357421875,"z":5653.06298828125,"formId":0x00015898},
    {"name":"Breakneck Cave","approxX":-30692,"approxY":62552,"x":-30692.45703125,"y":62551.5,"z":6972.50341796875,"formId":0x00015a28},
    {"name":"Greenmead Cave","approxX":-27252,"approxY":18871,"x":-27252.38671875,"y":18871.232421875,"z":2556.41796875,"formId":0x00015244},
    {"name":"Yellow Tick Cave","approxX":-23231,"approxY":83887,"x":-23230.5546875,"y":83886.96875,"z":7309.77734375,"formId":0x00015a01},
    {"name":"Haynote Cave","approxX":-23112,"approxY":42324,"x":-23111.611328125,"y":42324.44921875,"z":5170.140625,"formId":0x00015a2b},
    {"name":"Glademist Cave","approxX":-14701,"approxY":108591,"x":-14701.1259765625,"y":108590.7109375,"z":14403.458984375,"formId":0x001883a0},
    {"name":"Echo Cave","approxX":-12396,"approxY":156721,"x":-12396.2041015625,"y":156721.1875,"z":28289.46875,"formId":0x00015247},
    {"name":"Felgageldt Cave","approxX":-11667,"approxY":26882,"x":-11667.2041015625,"y":26881.923828125,"z":2135.45751953125,"formId":0x000159d5},
    {"name":"Underpall Cave","approxX":-9552,"approxY":131479,"x":-9552.3935546875,"y":131478.984375,"z":21761.998046875,"formId":0x00015a39},
    {"name":"Nisin Cave","approxX":-9464,"approxY":2234,"x":-9463.642578125,"y":2234.016357421875,"z":3840,"formId":0x000159fb},
    {"name":"Boreal Stone Cave","approxX":-1823,"approxY":153124,"x":-1822.64794921875,"y":153124.234375,"z":27992.00390625,"formId":0x00038f40},
    {"name":"Outlaw Endre's Cave","approxX":2819,"approxY":118873,"x":2819.46826171875,"y":118873.4453125,"z":15586.1015625,"formId":0x0001598f},
    {"name":"Capstone Cave","approxX":9755,"approxY":152469,"x":9755.41015625,"y":152469.078125,"z":26700.43359375,"formId":0x000159b3},
    {"name":"Dzonot Cave","approxX":11043,"approxY":57007,"x":11043.2509765625,"y":57006.7109375,"z":31.13861083984375,"formId":0x0001598c},
    {"name":"Fingerbowl Cave","approxX":15195,"approxY":106548,"x":15194.9326171875,"y":106548.3828125,"z":8865.732421875,"formId":0x00189790},
    {"name":"Sinkhole Cave","approxX":17538,"approxY":80749,"x":17537.76171875,"y":80748.9921875,"z":767.4365844726562,"formId":0x000159b1},
    {"name":"Bruma Caverns","approxX":17588,"approxY":143178,"x":17588.189453125,"y":143177.703125,"z":26052.873046875,"formId":0x000ca3f5},
    {"name":"Unmarked Cave","approxX":18554,"approxY":116327,"x":18554.12890625,"y":116326.8125,"z":13647.5087890625,"formId":0x00015703},
    {"name":"Pothole Caverns","approxX":21639,"approxY":-6353,"x":21639.21875,"y":-6353.0693359375,"z":1791.1336669921875,"formId":0x0018843c},
    {"name":"Horn Cave","approxX":26217,"approxY":19226,"x":26216.81640625,"y":19226.435546875,"z":1781.7591552734375,"formId":0x00015a36},
    {"name":"Imperial City Sewers - North Exit","approxX":28997,"approxY":81694,"x":28997.162109375,"y":81693.875,"z":39.650390625,"formId":0x000c50d5},
    {"name":"Toadstool Hollow","approxX":34561,"approxY":133259,"x":34560.84765625,"y":133258.609375,"z":19932.244140625,"formId":0x00015707},
    {"name":"Charcoal Cave","approxX":34590,"approxY":12732,"x":34590.26171875,"y":12732.291015625,"z":3594.359375,"formId":0x000156fc},
    {"name":"Mingo Cave","approxX":38917,"approxY":749,"x":38917.14453125,"y":748.6376342773438,"z":6148.95068359375,"formId":0x000159fa},
    {"name":"Serpent's Trail","approxX":39083,"approxY":172021,"x":39083.14453125,"y":172020.53125,"z":30439.49609375,"formId":0x0000c1f0},
    {"name":"Fatback Cave","approxX":39456,"approxY":31533,"x":39456.1171875,"y":31532.76171875,"z":30.065673828125,"formId":0x000156fe},
    {"name":"Imperial Sewer - South East Exit","approxX":44411,"approxY":52511,"x":44411.3515625,"y":52510.9453125,"z":20.708099365234375,"formId":0x000c50d3},
    {"name":"Bloodmayne Cave","approxX":44736,"approxY":-33008,"x":44736,"y":-33008,"z":688,"formId":0x000158bd},
    {"name":"Moss Rock Cavern","approxX":47493,"approxY":107132,"x":47492.6640625,"y":107132.15625,"z":5172.3095703125,"formId":0x0001598b},
    {"name":"Sideways Cave","approxX":51021,"approxY":78384,"x":51020.72265625,"y":78383.8359375,"z":541.75390625,"formId":0x0006c602},
    {"name":"Robber's Glen Cave","approxX":51458,"approxY":-10512,"x":51457.83203125,"y":-10511.5849609375,"z":4584.09375,"formId":0x00015924},
    {"name":"Red Ruby Cave","approxX":54217,"approxY":133251,"x":54217.30078125,"y":133250.96875,"z":21497.529296875,"formId":0x00015a2a},
    {"name":"Memorial Cave","approxX":59243,"approxY":48008,"x":59242.8203125,"y":48008.28125,"z":211.15380859375,"formId":0x00015704},
    {"name":"Frostfire Glade","approxX":61327,"approxY":123768,"x":61326.57421875,"y":123767.984375,"z":17516.8984375,"formId":0x00024b3d},
    {"name":"Wellspring Cave","approxX":64743,"approxY":60965,"x":64743.171875,"y":60965.41015625,"z":408.443359375,"formId":0x00053fe2},
    {"name":"Shinbone Cave","approxX":65479,"approxY":23876,"x":65479.3125,"y":23875.734375,"z":151.62696838378906,"formId":0x000156ff},
    {"name":"Veyond Cave","approxX":70671,"approxY":-10766,"x":70670.859375,"y":-10766.2333984375,"z":879.208740234375,"formId":0x00015a34},
    {"name":"The Beast's Maw","approxX":71495,"approxY":120810,"x":71495.2890625,"y":120809.8125,"z":17559.93359375,"formId":0x000159ff},
    {"name":"Rockmilk Cave","approxX":79215,"approxY":-107792,"x":79214.8515625,"y":-107792.3828125,"z":1864,"formId":0x00015895},
    {"name":"Silver Tooth Cave","approxX":82103,"approxY":129808,"x":82103.3125,"y":129808.109375,"z":23376.720703125,"formId":0x000156fd},
    {"name":"Undertow Cavern","approxX":85632,"approxY":-133406,"x":85631.625,"y":-133405.71875,"z":1224.26953125,"formId":0x000159f7},
    {"name":"Cracked Wood Cave","approxX":87343,"approxY":28961,"x":87343.2421875,"y":28960.509765625,"z":1064,"formId":0x0000ab54},
    {"name":"Reedstand Cave","approxX":90324,"approxY":-79591,"x":90323.9609375,"y":-79590.671875,"z":519.58447265625,"formId":0x00015a29},
    {"name":"Barren Cave","approxX":94565,"approxY":88203,"x":94565.2578125,"y":88203.2265625,"z":6264.39794921875,"formId":0x00015706},
    {"name":"Timberscar Hollow","approxX":95277,"approxY":12621,"x":95276.7109375,"y":12620.5322265625,"z":1151.2119140625,"formId":0x0000ab53},
    {"name":"Muck Valley Cavern","approxX":96469,"approxY":63205,"x":96469.2578125,"y":63204.8125,"z":2870.462890625,"formId":0x00015246},
    {"name":"Amelion Tomb","approxX":98974,"approxY":-128406,"x":98974.0625,"y":-128406.28125,"z":123.9716796875,"formId":0x000158bc},
    {"name":"Newt Cave","approxX":100124,"approxY":3829,"x":100124.4140625,"y":3829.1474609375,"z":192.91067504882812,"formId":0x00015a03},
    {"name":"Tidewater Cave","approxX":104217,"approxY":-170124,"x":104217.40625,"y":-170124.125,"z":713.2057495117188,"formId":0x0004fae1},
    {"name":"Darkfathom Cave","approxX":106754,"approxY":-148739,"x":106754.109375,"y":-148738.703125,"z":1102.638671875,"formId":0x00035a97},
    {"name":"Lake Arrius Caverns","approxX":107872,"approxY":117135,"x":107872.296875,"y":117134.96875,"z":12749.9208984375,"formId":0x0001e903},
    {"name":"Wenderbek Cave","approxX":110535,"approxY":36118,"x":110535.1640625,"y":36117.9609375,"z":2054.44873046875,"formId":0x0001570f},
    {"name":"Quickwater Cave","approxX":112329,"approxY":104595,"x":112329.3046875,"y":104594.7734375,"z":8272.658203125,"formId":0x000159fd},
    {"name":"Bramblepoint Cave","approxX":115283,"approxY":-14607,"x":115282.984375,"y":-14607.314453125,"z":3105.149169921875,"formId":0x00015a2e},
    {"name":"Vahtacen","approxX":126857,"approxY":72010,"x":126857.1015625,"y":72010.03125,"z":485.60498046875,"formId":0x000175ae},
    {"name":"Kingscrest Cavern","approxX":128415,"approxY":133572,"x":128415.0859375,"y":133572.203125,"z":17631.267578125,"formId":0x00015a35},
    {"name":"Fieldhouse Cave","approxX":128652,"approxY":-103754,"x":128651.671875,"y":-103753.8671875,"z":3150.57177734375,"formId":0x00015a00},
    {"name":"Crayfish Cave","approxX":129077,"approxY":29267,"x":129076.7578125,"y":29266.849609375,"z":1362.7662353515625,"formId":0x00015702},
    {"name":"Swampy Cave","approxX":132378,"approxY":72254,"x":132377.953125,"y":72254.28125,"z":13.88720703125,"formId":0x00047545},
    {"name":"Sage Glen Hollow","approxX":132921,"approxY":-5553,"x":132921.390625,"y":-5553.26708984375,"z":4423.2734375,"formId":0x00015a02},
    {"name":"Onyx Caverns","approxX":132977,"approxY":-131827,"x":132977.25,"y":-131827.40625,"z":3629.3564453125,"formId":0x000ad373},
    {"name":"Dark Fissure","approxX":140451,"approxY":67302,"x":140450.640625,"y":67302.4140625,"z":7853.0966796875,"formId":0x00015a37},
    {"name":"Bedrock Cave","approxX":152869,"approxY":-31081,"x":152869.265625,"y":-31080.876953125,"z":4097.77783203125,"formId":0x00015a32},
    {"name":"Shattered Scales Cave","approxX":153060,"approxY":-80157,"x":153059.859375,"y":-80156.65625,"z":1085.8544921875,"formId":0x000159fe},
    {"name":"Bloodrun Cave","approxX":164565,"approxY":-68293,"x":164564.96875,"y":-68293.234375,"z":1360.107421875,"formId":0x0018857c},
    {"name":"Kindred Cave","approxX":166658,"approxY":-64464,"x":166658.4375,"y":-64464.1328125,"z":1078.978515625,"formId":0x00189850},
    {"name":"Redwater Slough","approxX":171056,"approxY":-57810,"x":171055.96875,"y":-57809.7109375,"z":414.56005859375,"formId":0x0017c44a},
    {"name":"Lost Boy Cavern","approxX":172712,"approxY":-13537,"x":172711.828125,"y":-13537.4345703125,"z":3102.671875,"formId":0x00015700},
    {"name":"Arrowshaft Cavern","approxX":174756,"approxY":3738,"x":174755.953125,"y":3737.835693359375,"z":9679.6796875,"formId":0x00015a2f},
    {"name":"Leafrot Cave","approxX":178816,"approxY":-46692,"x":178815.734375,"y":-46692.1875,"z":1434.4892578125,"formId":0x00015245},
    {"name":"Crowhaven","approxX":-208980,"approxY":-10052,"x":-208980.34375,"y":-10052.236328125,"z":5591.2861328125,"formId":0x0001750d},
    {"name":"Fort Sutch","approxX":-193771,"approxY":13012,"x":-193770.9375,"y":13012.2490234375,"z":3534.34033203125,"formId":0x000174f4},
    {"name":"Fort Strand","approxX":-178144,"approxY":-32679,"x":-178144.1875,"y":-32678.93359375,"z":2059.93359375,"formId":0x00017511},
    {"name":"Fort Wariel","approxX":-166734,"approxY":2838,"x":-166734.359375,"y":2838.212890625,"z":8291.7939453125,"formId":0x00017519},
    {"name":"Fort Hastrel","approxX":-156885,"approxY":29529,"x":-156884.59375,"y":29529.2890625,"z":8808.92578125,"formId":0x000174c5},
    {"name":"Fort Linchal","approxX":-129958,"approxY":15530,"x":-129957.828125,"y":15530.0341796875,"z":6326.29931640625,"formId":0x000174d4},
    {"name":"Fort Ontus","approxX":-117322,"approxY":58016,"x":-117321.578125,"y":58015.7265625,"z":22486.6015625,"formId":0x000174fc},
    {"name":"Fort Istirus","approxX":-105844,"approxY":-13128,"x":-105844,"y":-13128,"z":5729.080078125,"formId":0x000174d0},
    {"name":"Fort Dirich","approxX":-89684,"approxY":43045,"x":-89684.5,"y":43044.78125,"z":10305.673828125,"formId":0x00017501},
    {"name":"Fort Rayles","approxX":-88830,"approxY":116281,"x":-88829.5625,"y":116281.234375,"z":21961.53125,"formId":0x000174ec},
    {"name":"Fort Carmala","approxX":-63945,"approxY":69539,"x":-63944.56640625,"y":69538.59375,"z":8290.931640625,"formId":0x0001751d},
    {"name":"Sancre Tor","approxX":-49098,"approxY":136530,"x":-49098.48046875,"y":136530.25,"z":23815.3828125,"formId":0x00026ebd},
    {"name":"Fort Wooden Hand","approxX":-39102,"approxY":48925,"x":-39102.33203125,"y":48925.25390625,"z":7736,"formId":0x00017508},
    {"name":"Fort Ash","approxX":-35344,"approxY":78848,"x":-35344,"y":78848,"z":9214.0498046875,"formId":0x0007812d},
    {"name":"Fort Vlastarus","approxX":-34188,"approxY":7364,"x":-34187.671875,"y":7364.43798828125,"z":4634.24755859375,"formId":0x000174c4},
    {"name":"Fort Coldcorn","approxX":-21154,"approxY":96631,"x":-21154.306640625,"y":96630.5703125,"z":8393.2265625,"formId":0x000174bd},
    {"name":"Fort Nikel","approxX":-14598,"approxY":67735,"x":-14597.90234375,"y":67734.8203125,"z":1718.506591796875,"formId":0x00017510},
    {"name":"Fort Empire","approxX":-7269,"approxY":90312,"x":-7269.455078125,"y":90312.2734375,"z":2617.302001953125,"formId":0x000174d8},
    {"name":"Fort Virtue","approxX":-5965,"approxY":41741,"x":-5965.140625,"y":41741.23828125,"z":560.969482421875,"formId":0x000174cc},
    {"name":"Fort Roebeck","approxX":5221,"approxY":11052,"x":5221.1396484375,"y":11052.3212890625,"z":602.2584228515625,"formId":0x000174e8},
    {"name":"Fort Black Boot","approxX":10274,"approxY":-21667,"x":10274.2236328125,"y":-21667.20703125,"z":6228.4130859375,"formId":0x00017520},
    {"name":"Fort Caractacus","approxX":17178,"approxY":95292,"x":17178.177734375,"y":95292.109375,"z":4018.522216796875,"formId":0x00017504},
    {"name":"Fort Homestead","approxX":22945,"approxY":29944,"x":22944.869140625,"y":29944.0234375,"z":1185.6044921875,"formId":0x0001750c},
    {"name":"Fort Alessia","approxX":51593,"approxY":18876,"x":51592.76171875,"y":18875.822265625,"z":1376,"formId":0x00017515},
    {"name":"Fort Variela","approxX":60483,"approxY":3307,"x":60483.12890625,"y":3306.502197265625,"z":2933.9755859375,"formId":0x000174d5},
    {"name":"Fort Urasek","approxX":60768,"approxY":75680,"x":60768,"y":75680,"z":1287.498291015625,"formId":0x0006d76c},
    {"name":"Fort Chalman","approxX":61511,"approxY":100234,"x":61511.38671875,"y":100234.359375,"z":3452.1103515625,"formId":0x000174f0},
    {"name":"Fort Magia","approxX":64913,"approxY":56657,"x":64912.7109375,"y":56657.33203125,"z":1071.38671875,"formId":0x000174c8},
    {"name":"Fathis Aren's Tower","approxX":68889,"approxY":-56073,"x":68889.2890625,"y":-56073.05078125,"z":2210.44775390625,"formId":0x000c431a},
    {"name":"Fort Horunn","approxX":72173,"approxY":128528,"x":72172.6484375,"y":128527.875,"z":20542.541015625,"formId":0x000174dd},
    {"name":"Fort Nomore","approxX":82567,"approxY":-79482,"x":82566.8359375,"y":-79482.3046875,"z":2053.0517578125,"formId":0x000174d9},
    {"name":"Fort Sejanus","approxX":83900,"approxY":39702,"x":83899.84375,"y":39701.90234375,"z":1366.4110107421875,"formId":0x000174e4},
    {"name":"Fort Redman","approxX":92268,"approxY":-102371,"x":92268.1953125,"y":-102371.0625,"z":154.69091796875,"formId":0x000174fa},
    {"name":"Fort Aurus","approxX":98201,"approxY":-10832,"x":98200.6640625,"y":-10832.12890625,"z":646.9326782226562,"formId":0x000174e9},
    {"name":"Arkved's Tower","approxX":98914,"approxY":49191,"x":98914.375,"y":49191.40625,"z":6220.8828125,"formId":0x0008dc45},
    {"name":"Fort Irony","approxX":99113,"approxY":-59975,"x":99112.625,"y":-59975.19140625,"z":1650.580078125,"formId":0x000174e1},
    {"name":"Fort Grief","approxX":99217,"approxY":-23254,"x":99217.359375,"y":-23254.283203125,"z":118.57403564453125,"formId":0x0001fe0d},
    {"name":"Fort Cedrian","approxX":112410,"approxY":14763,"x":112410.0859375,"y":14762.9873046875,"z":102.072509765625,"formId":0x0001751c},
    {"name":"Fort Doublecross","approxX":117507,"approxY":-118018,"x":117506.8671875,"y":-118017.796875,"z":3097.363525390625,"formId":0x000174f1},
    {"name":"Fort Blueblood","approxX":122493,"approxY":-156127,"x":122492.6953125,"y":-156126.71875,"z":2739.8740234375,"formId":0x000174fd},
    {"name":"Fort Farragut","approxX":131213,"approxY":98663,"x":131212.53125,"y":98663.40625,"z":10282.150390625,"formId":0x000174f6},
    {"name":"Fort Flecia","approxX":137947,"approxY":-17396,"x":137946.6875,"y":-17396.345703125,"z":3052.162109375,"formId":0x000174e0},
    {"name":"Fort Naso","approxX":139296,"approxY":54685,"x":139296.28125,"y":54684.52734375,"z":11507.6611328125,"formId":0x000174c1},
    {"name":"Fort Facian","approxX":144474,"approxY":35249,"x":144473.734375,"y":35248.734375,"z":6080.443359375,"formId":0x000174c9},
    {"name":"Fort Scinia","approxX":147693,"approxY":84351,"x":147692.859375,"y":84351.1875,"z":9415.34375,"formId":0x00017518},
    {"name":"Fort Teleman","approxX":147803,"approxY":-96811,"x":147802.578125,"y":-96810.5546875,"z":3181.6787109375,"formId":0x000174f9},
    {"name":"Fort Gold-Throat","approxX":152737,"approxY":-42777,"x":152737.46875,"y":-42776.84765625,"z":1728.551513671875,"formId":0x000174ed},
    {"name":"Fort Entius","approxX":157631,"approxY":6311,"x":157631.203125,"y":6310.8916015625,"z":217.70407104492188,"formId":0x000174e5},
    {"name":"Fort Redwater","approxX":177026,"approxY":-61028,"x":177025.84375,"y":-61028.48828125,"z":247.365234375,"formId":0x000174c0},
    {"name":"Fort Cuptor","approxX":180701,"approxY":-27563,"x":180700.875,"y":-27562.611328125,"z":629.66064453125,"formId":0x000174d1},
    {"name":"Oblivion Gate - Anvil","approxX":-202117,"approxY":-23049,"x":-202116.984375,"y":-23049.359375,"z":1984.185791015625,"formId":0x000cd414},
    {"name":"Oblivion Gate","approxX":-187164,"approxY":14116,"x":-187164,"y":14116,"z":4401.69970703125,"formId":0x0000cd09},
    {"name":"Oblivion Gate","approxX":-165840,"approxY":-23920,"x":-165840,"y":-23920,"z":4715.48046875,"formId":0x00014d1a},
    {"name":"Oblivion Gate - Kvatch","approxX":-144798,"approxY":-17910,"x":-144797.609375,"y":-17910,"z":11384,"formId":0x0000cef7},
    {"name":"Oblivion Gate","approxX":-122279,"approxY":25777,"x":-122278.7578125,"y":25777.234375,"z":9939.15625,"formId":0x000038cc},
    {"name":"Oblivion Gate","approxX":-99123,"approxY":14940,"x":-99123.4453125,"y":14940.896484375,"z":6736.02685546875,"formId":0x000039ca},
    {"name":"Oblivion Gate","approxX":-71309,"approxY":28821,"x":-71309.6640625,"y":28821.486328125,"z":7354.58837890625,"formId":0x000039d3},
    {"name":"Oblivion Gate - Chorrol","approxX":-63444,"approxY":84905,"x":-63444.46484375,"y":84905.078125,"z":14485.0517578125,"formId":0x0000cefb},
    {"name":"Oblivion Gate","approxX":-56868,"approxY":63627,"x":-56868.6484375,"y":63627.83203125,"z":10424.4833984375,"formId":0x000038fe},
    {"name":"Oblivion Gate - Skingrad","approxX":-52058,"approxY":2307,"x":-52058.8828125,"y":2307.29296875,"z":7921.98046875,"formId":0x0000cefd},
    {"name":"Oblivion Gate","approxX":28954,"approxY":756,"x":28954.708984375,"y":756.0094604492188,"z":3915.65087890625,"formId":0x00003967},
    {"name":"Oblivion Gate","approxX":65340,"approxY":-6272,"x":65340.78515625,"y":-6272.42431640625,"z":3573.4091796875,"formId":0x00003937},
    {"name":"Oblivion Gate - Bravil","approxX":71302,"approxY":-27351,"x":71302.84375,"y":-27351.19921875,"z":1311.589599609375,"formId":0x0000cef9},
    {"name":"Oblivion Gate","approxX":79155,"approxY":147790,"x":79155.90625,"y":147790.4375,"z":34291.40625,"formId":0x00003986},
    {"name":"Oblivion Gate - Leyawiin","approxX":103901,"approxY":-138643,"x":103900.828125,"y":-138642.96875,"z":101.931640625,"formId":0x0000cefc},
    {"name":"Oblivion Gate - Cheydinhal","approxX":109041,"approxY":96580,"x":109041.125,"y":96580.0234375,"z":8303.8447265625,"formId":0x0000cef8},
    {"name":"Oblivion Gate","approxX":123858,"approxY":-146772,"x":123858.0625,"y":-146772.140625,"z":3110.958984375,"formId":0x000038a9},
    {"name":"Oblivion Gate","approxX":137895,"approxY":-132036,"x":137895.46875,"y":-132036,"z":3372.5546875,"formId":0x000038b4},
    {"name":"Oblivion Gate","approxX":-202682,"approxY":2772,"x":-202682.015625,"y":2772.20703125,"z":7250.033203125,"formId":0x00014d15},
    {"name":"Oblivion Gate","approxX":-195584,"approxY":25312,"x":-195584,"y":25312,"z":5903.7333984375,"formId":0x00014d17},
    {"name":"Oblivion Gate","approxX":-178032,"approxY":-17136,"x":-178032,"y":-17136,"z":5813.900390625,"formId":0x000cd413},
    {"name":"Oblivion Gate","approxX":-176704,"approxY":-45888,"x":-176704,"y":-45888,"z":4154.90234375,"formId":0x00014d1c},
    {"name":"Oblivion Gate","approxX":-158288,"approxY":-49936,"x":-158288,"y":-49936,"z":1258.9091796875,"formId":0x00014d1b},
    {"name":"Oblivion Gate","approxX":-157200,"approxY":18304,"x":-157200,"y":18304,"z":8570.6318359375,"formId":0x00014d18},
    {"name":"Oblivion Gate","approxX":-153120,"approxY":1104,"x":-153120,"y":1104,"z":8101.52587890625,"formId":0x00014d19},
    {"name":"Oblivion Gate","approxX":-144642,"approxY":35127,"x":-144642.40625,"y":35127.25,"z":14221.052734375,"formId":0x000038cd},
    {"name":"Oblivion Gate","approxX":-141688,"approxY":-38153,"x":-141688.46875,"y":-38153.93359375,"z":4594.79296875,"formId":0x000039ec},
    {"name":"Oblivion Gate","approxX":-138719,"approxY":3580,"x":-138719.34375,"y":3580.222412109375,"z":6590.3837890625,"formId":0x000038c6},
    {"name":"Oblivion Gate","approxX":-124680,"approxY":51015,"x":-124679.9375,"y":51015.44140625,"z":19464.28125,"formId":0x000038ce},
    {"name":"Oblivion Gate","approxX":-113698,"approxY":67841,"x":-113697.609375,"y":67841.1171875,"z":22967.55859375,"formId":0x000038d9},
    {"name":"Oblivion Gate","approxX":-97306,"approxY":35481,"x":-97306.6171875,"y":35481.5703125,"z":14065.466796875,"formId":0x000038f0},
    {"name":"Oblivion Gate","approxX":-97225,"approxY":47135,"x":-97225.4921875,"y":47135.1328125,"z":10016,"formId":0x000038ef},
    {"name":"Oblivion Gate","approxX":-96906,"approxY":104883,"x":-96906.8984375,"y":104883.28125,"z":19756.65625,"formId":0x000038da},
    {"name":"Oblivion Gate","approxX":-91234,"approxY":3718,"x":-91234.4296875,"y":3718.262939453125,"z":7131.19921875,"formId":0x000039ea},
    {"name":"Oblivion Gate","approxX":-89115,"approxY":73890,"x":-89115.4765625,"y":73890.7578125,"z":13447.99609375,"formId":0x000038eb},
    {"name":"Oblivion Gate","approxX":-88500,"approxY":-4857,"x":-88500.296875,"y":-4857.7685546875,"z":6879.716796875,"formId":0x000039eb},
    {"name":"Oblivion Gate","approxX":-82744,"approxY":17039,"x":-82744.453125,"y":17039.19140625,"z":6071.5419921875,"formId":0x000039e8},
    {"name":"Oblivion Gate","approxX":-81777,"approxY":115572,"x":-81777.25,"y":115571.8828125,"z":18850.98046875,"formId":0x000038db},
    {"name":"Oblivion Gate","approxX":-80713,"approxY":101013,"x":-80713.9296875,"y":101013.203125,"z":16388.630859375,"formId":0x000038e6},
    {"name":"Oblivion Gate","approxX":-64758,"approxY":131895,"x":-64758.07421875,"y":131894.90625,"z":28264.6171875,"formId":0x000038e8},
    {"name":"Oblivion Gate","approxX":-60732,"approxY":154710,"x":-60732.00390625,"y":154710,"z":39402.0234375,"formId":0x000039b5},
    {"name":"Oblivion Gate","approxX":-54407,"approxY":13421,"x":-54407.82421875,"y":13421.7900390625,"z":5960,"formId":0x000039d2},
    {"name":"Oblivion Gate","approxX":-40015,"approxY":352,"x":-40015.6484375,"y":352.3001708984375,"z":5904.6474609375,"formId":0x000039d1},
    {"name":"Oblivion Gate","approxX":-38932,"approxY":86099,"x":-38932.1015625,"y":86099.03125,"z":8886.6298828125,"formId":0x000038f6},
    {"name":"Oblivion Gate","approxX":-36621,"approxY":-11096,"x":-36621.91796875,"y":-11096.4921875,"z":4412.56396484375,"formId":0x000039cf},
    {"name":"Oblivion Gate","approxX":-34853,"approxY":38165,"x":-34853.390625,"y":38165.9375,"z":5656.03125,"formId":0x00003907},
    {"name":"Oblivion Gate","approxX":-31233,"approxY":147296,"x":-31233.712890625,"y":147295.5625,"z":32618.748046875,"formId":0x0000398c},
    {"name":"Oblivion Gate","approxX":-24185,"approxY":71908,"x":-24184.955078125,"y":71908.671875,"z":5970.158203125,"formId":0x00003909},
    {"name":"Oblivion Gate","approxX":-17078,"approxY":-21541,"x":-17078.7578125,"y":-21540.98046875,"z":1944.7525634765625,"formId":0x000039cd},
    {"name":"Oblivion Gate","approxX":-14143,"approxY":-4828,"x":-14143.8671875,"y":-4828.109375,"z":4100.81396484375,"formId":0x000039cc},
    {"name":"Oblivion Gate","approxX":-6422,"approxY":16537,"x":-6422.3359375,"y":16537.86328125,"z":3539.8193359375,"formId":0x00003906},
    {"name":"Oblivion Gate","approxX":-4068,"approxY":101697,"x":-4068.29541015625,"y":101696.8984375,"z":7480.5556640625,"formId":0x0000390d},
    {"name":"Oblivion Gate","approxX":-3718,"approxY":-14847,"x":-3718.635498046875,"y":-14846.99609375,"z":1602.52294921875,"formId":0x000039d0},
    {"name":"Oblivion Gate","approxX":4519,"approxY":-6568,"x":4519.4384765625,"y":-6568.65185546875,"z":5658.001953125,"formId":0x000039cb},
    {"name":"Oblivion Gate","approxX":6950,"approxY":146041,"x":6950.13720703125,"y":146040.859375,"z":27929.857421875,"formId":0x0000398e},
    {"name":"Oblivion Gate","approxX":19522,"approxY":15566,"x":19522.796875,"y":15566,"z":861.2145385742188,"formId":0x00003905},
    {"name":"Oblivion Gate","approxX":23751,"approxY":-13401,"x":23751.7578125,"y":-13401.4912109375,"z":3393.137939453125,"formId":0x000039ce},
    {"name":"Oblivion Gate","approxX":24688,"approxY":106748,"x":24688.044921875,"y":106748.328125,"z":5673.93994140625,"formId":0x00003915},
    {"name":"Oblivion Gate","approxX":37360,"approxY":129259,"x":37360.03515625,"y":129258.78125,"z":16870.337890625,"formId":0x0000392d},
    {"name":"Oblivion Gate","approxX":41950,"approxY":-19567,"x":41950.703125,"y":-19567.396484375,"z":1573.10205078125,"formId":0x000038ff},
    {"name":"Oblivion Gate","approxX":47761,"approxY":40065,"x":47761.296875,"y":40065.87890625,"z":1046.1181640625,"formId":0x0000394b},
    {"name":"Oblivion Gate","approxX":56591,"approxY":94192,"x":56591.36328125,"y":94192.9375,"z":972.89453125,"formId":0x00003957},
    {"name":"Oblivion Gate","approxX":60370,"approxY":10705,"x":60370.37890625,"y":10705.7890625,"z":749.8057250976562,"formId":0x00003940},
    {"name":"Oblivion Gate","approxX":70120,"approxY":86578,"x":70119.90625,"y":86578.171875,"z":6127.6884765625,"formId":0x00003959},
    {"name":"Oblivion Gate","approxX":73392,"approxY":112305,"x":73392.5078125,"y":112305.15625,"z":15809.4482421875,"formId":0x00003930},
    {"name":"Oblivion Gate","approxX":78361,"approxY":63702,"x":78360.9609375,"y":63702.08984375,"z":4228.16552734375,"formId":0x0000395a},
    {"name":"Oblivion Gate","approxX":79368,"approxY":26356,"x":79368.453125,"y":26356.552734375,"z":2253.021484375,"formId":0x000039f8},
    {"name":"Oblivion Gate","approxX":79807,"approxY":-100902,"x":79807.3828125,"y":-100901.5234375,"z":1167.18798828125,"formId":0x000038ac},
    {"name":"Oblivion Gate","approxX":84738,"approxY":2703,"x":84738.546875,"y":2703,"z":1374.48046875,"formId":0x00003963},
    {"name":"Oblivion Gate","approxX":86505,"approxY":47589,"x":86505.4921875,"y":47589.53125,"z":1953.819091796875,"formId":0x000039f7},
    {"name":"Oblivion Gate","approxX":89265,"approxY":103633,"x":89264.96875,"y":103633.015625,"z":9363.0068359375,"formId":0x00003910},
    {"name":"Oblivion Gate","approxX":95452,"approxY":130578,"x":95452.109375,"y":130578.1015625,"z":26763.9453125,"formId":0x0000398d},
    {"name":"Oblivion Gate","approxX":97544,"approxY":-131665,"x":97544.7265625,"y":-131665.234375,"z":29.634918212890625,"formId":0x000038ae},
    {"name":"Oblivion Gate","approxX":103806,"approxY":-112618,"x":103805.7265625,"y":-112618.4921875,"z":3458.81494140625,"formId":0x000038b6},
    {"name":"Oblivion Gate","approxX":105043,"approxY":27394,"x":105043,"y":27394,"z":3535.63720703125,"formId":0x000039f9},
    {"name":"Oblivion Gate","approxX":108514,"approxY":-164944,"x":108514.0859375,"y":-164943.59375,"z":2604.11572265625,"formId":0x000038b0},
    {"name":"Oblivion Gate","approxX":108602,"approxY":-75450,"x":108601.5625,"y":-75450.484375,"z":1165.19921875,"formId":0x000038be},
    {"name":"Oblivion Gate","approxX":112205,"approxY":71510,"x":112205.0078125,"y":71510,"z":5568.92529296875,"formId":0x000039ee},
    {"name":"Oblivion Gate","approxX":112313,"approxY":147535,"x":112312.734375,"y":147534.796875,"z":20846.32421875,"formId":0x000039c7},
    {"name":"Oblivion Gate","approxX":114047,"approxY":-152194,"x":114046.703125,"y":-152194.21875,"z":3351.04052734375,"formId":0x000038af},
    {"name":"Oblivion Gate","approxX":117339,"approxY":-100272,"x":117339.4609375,"y":-100272.1484375,"z":5049.607421875,"formId":0x000038b8},
    {"name":"Oblivion Gate","approxX":120244,"approxY":109173,"x":120244.40625,"y":109172.6484375,"z":7965.109375,"formId":0x000039f6},
    {"name":"Oblivion Gate","approxX":120426,"approxY":59564,"x":120425.6640625,"y":59564.27734375,"z":1458.111328125,"formId":0x000039f1},
    {"name":"Oblivion Gate","approxX":121398,"approxY":-57809,"x":121398.0234375,"y":-57809.16796875,"z":530.7861328125,"formId":0x000039fc},
    {"name":"Oblivion Gate","approxX":122884,"approxY":-176245,"x":122883.8046875,"y":-176245.421875,"z":556.5523071289062,"formId":0x000038b1},
    {"name":"Oblivion Gate","approxX":123737,"approxY":14447,"x":123736.8203125,"y":14447.638671875,"z":3688.542236328125,"formId":0x000039fa},
    {"name":"Oblivion Gate","approxX":125117,"approxY":-7560,"x":125117.40625,"y":-7560.609375,"z":5709.4462890625,"formId":0x000039fb},
    {"name":"Oblivion Gate","approxX":126487,"approxY":76324,"x":126486.5625,"y":76324.40625,"z":1759.54638671875,"formId":0x000039f5},
    {"name":"Oblivion Gate","approxX":131954,"approxY":-167651,"x":131953.5,"y":-167650.625,"z":2828.9384765625,"formId":0x000038b2},
    {"name":"Oblivion Gate","approxX":136996,"approxY":-41331,"x":136996.328125,"y":-41331.25,"z":7238.322265625,"formId":0x000039fd},
    {"name":"Oblivion Gate","approxX":139882,"approxY":-100916,"x":139882.40625,"y":-100915.8828125,"z":3161.3505859375,"formId":0x000038bb},
    {"name":"Oblivion Gate","approxX":140024,"approxY":103001,"x":140023.546875,"y":103000.765625,"z":18227.2109375,"formId":0x000039c8},
    {"name":"Oblivion Gate","approxX":145248,"approxY":22778,"x":145248,"y":22778,"z":9326.732421875,"formId":0x000039ff},
    {"name":"Oblivion Gate","approxX":148977,"approxY":-86885,"x":148977.03125,"y":-86885.8515625,"z":1663.474609375,"formId":0x000038c5},
    {"name":"Oblivion Gate","approxX":159579,"approxY":30387,"x":159579.296875,"y":30387.236328125,"z":4435.63427734375,"formId":0x000039c9},
    {"name":"Oblivion Gate","approxX":172344,"approxY":-9250,"x":172344.25,"y":-9250.568359375,"z":2600.05224609375,"formId":0x000039fe},
    {"name":"Oblivion Gate","approxX":180034,"approxY":-39331,"x":180033.875,"y":-39331.51953125,"z":2981.9814453125,"formId":0x00003a00},
    {"name":"Oblivion Gate","approxX":201985,"approxY":-9193,"x":201985.125,"y":-9193.9267578125,"z":7805.17333984375,"formId":0x00003a02},
    {"name":"Brina Cross Inn","approxX":-186045,"approxY":-10372,"x":-186044.890625,"y":-10371.9736328125,"z":6910.9130859375,"formId":0x000177af},
    {"name":"Gottshaw Inn","approxX":-162375,"approxY":-16046,"x":-162374.578125,"y":-16046.017578125,"z":6389.66455078125,"formId":0x00091cff},
    {"name":"Wawnet Inn","approxX":-2088,"approxY":62990,"x":-2087.55126953125,"y":62989.71484375,"z":1116.809326171875,"formId":0x000ac546},
    {"name":"Faregyl Inn","approxX":22058,"approxY":1388,"x":22058,"y":1388,"z":1401.06005859375,"formId":0x00017798},
    {"name":"Inn of Ill Omen","approxX":30400,"approxY":-2580,"x":30399.548828125,"y":-2580.041259765625,"z":3949.86474609375,"formId":0x0001779a},
    {"name":"Roxey Inn","approxX":48479,"approxY":102739,"x":48478.87890625,"y":102738.875,"z":3035.64404296875,"formId":0x0005b00d},
    {"name":"The Drunken Dragon Inn","approxX":127900,"approxY":-89560,"x":127900.0390625,"y":-89559.96875,"z":6228.16552734375,"formId":0x000177a9},
    {"name":"Imperial Bridge Inn","approxX":134790,"approxY":-22092,"x":134789.953125,"y":-22092.314453125,"z":726.4288330078125,"formId":0x000177aa},
    {"name":"Cloud Top","approxX":-83085,"approxY":128442,"x":-83084.8125,"y":128442.3359375,"z":28500.12109375,"formId":0x000cd31f},
    {"name":"Shadeleaf Copse","approxX":-52000,"approxY":25291,"x":-51999.9296875,"y":25290.755859375,"z":6529.37353515625,"formId":0x00094040},
    {"name":"Old Bridge","approxX":17295,"approxY":27357,"x":17295.072265625,"y":27357.0859375,"z":97.7421875,"formId":0x00051f87},
    {"name":"Dragonclaw Rock","approxX":46067,"approxY":166045,"x":46067.7734375,"y":166044.765625,"z":25972.09375,"formId":0x000174dc},
    {"name":"Harcane Grove","approxX":46925,"approxY":-1257,"x":46925.2578125,"y":-1257.9022216796875,"z":3814.912841796875,"formId":0x0000a3b6},
    {"name":"Gnoll Mountain","approxX":53880,"approxY":152660,"x":53879.88671875,"y":152660.375,"z":34486.7265625,"formId":0x00188f45},
    {"name":"Mouth of the Panther","approxX":116045,"approxY":-62410,"x":116044.6640625,"y":-62410.26953125,"z":389.9296875,"formId":0x00071318},
    {"name":"Dive Rock","approxX":138134,"approxY":142738,"x":138133.703125,"y":142738.453125,"z":34187.2890625,"formId":0x000c55ed},
    {"name":"Hero Hill","approxX":139975,"approxY":79852,"x":139974.5,"y":79851.6953125,"z":5065.65771484375,"formId":0x00051443},
    {"name":"Bleak Mine","approxX":-189161,"approxY":2310,"x":-189160.578125,"y":2310.29833984375,"z":5404.60302734375,"formId":0x0001752b},
    {"name":"Bellator's Folly","approxX":-151766,"approxY":-27079,"x":-151765.96875,"y":-27079.279296875,"z":8163.23486328125,"formId":0x00017547},
    {"name":"Shattered Mine","approxX":-149543,"approxY":18916,"x":-149542.859375,"y":18915.6875,"z":8031.4208984375,"formId":0x0001754f},
    {"name":"Dasek Moor","approxX":-145906,"approxY":-32415,"x":-145905.75,"y":-32415.501953125,"z":5643.19287109375,"formId":0x00017514},
    {"name":"Infested Mine","approxX":-138255,"approxY":48891,"x":-138255.328125,"y":48890.87109375,"z":15222.7021484375,"formId":0x00017546},
    {"name":"Echo Mine","approxX":-108407,"approxY":38878,"x":-108407.078125,"y":38877.8828125,"z":14144,"formId":0x00017543},
    {"name":"Cursed Mine","approxX":-84263,"approxY":6292,"x":-84262.5859375,"y":6291.837890625,"z":6514.5439453125,"formId":0x00017542},
    {"name":"Pillaged Mine","approxX":-78646,"approxY":88499,"x":-78646.28125,"y":88499.234375,"z":13912.84765625,"formId":0x0001752f},
    {"name":"Crumbling Mine","approxX":-60395,"approxY":90586,"x":-60394.96875,"y":90585.9453125,"z":14062.224609375,"formId":0x0001755a},
    {"name":"Derelict Mine","approxX":-51974,"approxY":10147,"x":-51973.5546875,"y":10147.240234375,"z":6907.298828125,"formId":0x00017556},
    {"name":"Plundered Mine","approxX":43522,"approxY":149759,"x":43521.5859375,"y":149759.328125,"z":25664.474609375,"formId":0x00017553},
    {"name":"Flooded Mine","approxX":67084,"approxY":-21085,"x":67083.9375,"y":-21085.337890625,"z":856.9793090820312,"formId":0x0001752e},
    {"name":"Exhausted Mine","approxX":71612,"approxY":102223,"x":71612.2734375,"y":102222.5234375,"z":7522.77392578125,"formId":0x0001754e},
    {"name":"Empty Mine","approxX":75935,"approxY":55010,"x":75934.6328125,"y":55010.3046875,"z":2209.240234375,"formId":0x0001754b},
    {"name":"Forsaken Mine","approxX":89281,"approxY":-154047,"x":89281.3046875,"y":-154046.734375,"z":491.42333984375,"formId":0x00017536},
    {"name":"Gutted Mine","approxX":99704,"approxY":130284,"x":99704.25,"y":130283.546875,"z":26367.70703125,"formId":0x0001752a},
    {"name":"Desolate Mine","approxX":100175,"approxY":105337,"x":100174.7265625,"y":105336.75,"z":9318.775390625,"formId":0x00017533},
    {"name":"Barren Mine","approxX":118272,"approxY":-84451,"x":118271.5,"y":-84451.53125,"z":3836.75,"formId":0x00017552},
    {"name":"Squandered Mine","approxX":129172,"approxY":46685,"x":129172.28125,"y":46685.44140625,"z":5874.935546875,"formId":0x0001753e},
    {"name":"Haunted Mine","approxX":135361,"approxY":-84739,"x":135361.21875,"y":-84738.65625,"z":1862.0740966796875,"formId":0x0001754a},
    {"name":"Rickety Mine","approxX":137486,"approxY":92106,"x":137486.4375,"y":92106.1171875,"z":12340.275390625,"formId":0x0001753f},
    {"name":"Doomed Mine","approxX":144254,"approxY":64556,"x":144254.328125,"y":64556.36328125,"z":7207.158203125,"formId":0x00017557},
    {"name":"Deserted Mine","approxX":149010,"approxY":12877,"x":149009.625,"y":12876.869140625,"z":6655.041015625,"formId":0x0001753b},
    {"name":"Collapsed Mine","approxX":176575,"approxY":8025,"x":176575,"y":8025.08544921875,"z":10977.3544921875,"formId":0x0001753a},
    {"name":"Abandoned Mine","approxX":196325,"approxY":-15451,"x":196325.265625,"y":-15451.310546875,"z":3656.892822265625,"formId":0x00017537},
    {"name":"Beldaburo","approxX":-212407,"approxY":1161,"x":-212407.4375,"y":1160.614501953125,"z":2655.038818359375,"formId":0x00017578},
    {"name":"Niryastare","approxX":-178413,"approxY":29940,"x":-178413.171875,"y":29940.384765625,"z":5550.689453125,"formId":0x00017568},
    {"name":"Garlas Agea","approxX":-173118,"approxY":-19279,"x":-173117.828125,"y":-19279.12890625,"z":4548.80712890625,"formId":0x000ad44e},
    {"name":"Trumbe","approxX":-161939,"approxY":9973,"x":-161939.171875,"y":9973.4765625,"z":6116.765625,"formId":0x00017563},
    {"name":"Varondo","approxX":-134762,"approxY":38577,"x":-134761.578125,"y":38576.75390625,"z":17757.232421875,"formId":0x0001757b},
    {"name":"Miscarcand","approxX":-113132,"approxY":1340,"x":-113132,"y":1340,"z":6971.30419921875,"formId":0x000175af},
    {"name":"Talwinque","approxX":-111263,"approxY":24030,"x":-111262.7890625,"y":24030.06640625,"z":8906.12109375,"formId":0x00017583},
    {"name":"Nonungalo","approxX":-103616,"approxY":52203,"x":-103615.890625,"y":52202.6328125,"z":10968.0380859375,"formId":0x000a0d17},
    {"name":"Wendir","approxX":-75185,"approxY":69303,"x":-75185.171875,"y":69302.828125,"z":10507.6591796875,"formId":0x00017359},
    {"name":"Lipsand Tarn","approxX":-72113,"approxY":137415,"x":-72113.5,"y":137414.515625,"z":33953.79296875,"formId":0x0011c8a2},
    {"name":"Elenglynn","approxX":-67577,"approxY":45943,"x":-67577.1875,"y":45942.671875,"z":7906.2529296875,"formId":0x0001757f},
    {"name":"Hrotanda Vale","approxX":-59309,"approxY":112434,"x":-59309.5390625,"y":112434.046875,"z":16412.23046875,"formId":0x00017567},
    {"name":"Narfinsel","approxX":-46608,"approxY":62944,"x":-46608,"y":62944,"z":8459.6630859375,"formId":0x0001758c},
    {"name":"Silorn","approxX":-43115,"approxY":-14618,"x":-43114.7421875,"y":-14617.93359375,"z":3534.5595703125,"formId":0x0001756f},
    {"name":"Ninendava","approxX":-37923,"approxY":141601,"x":-37923.515625,"y":141601.109375,"z":26051.951171875,"formId":0x0001735b},
    {"name":"Lindai","approxX":-31160,"approxY":97002,"x":-31159.658203125,"y":97001.875,"z":9244.05859375,"formId":0x00017598},
    {"name":"Ceyatatar","approxX":-24816,"approxY":31200,"x":-24816,"y":31200,"z":3653.701904296875,"formId":0x00017574},
    {"name":"Moranda","approxX":-22330,"approxY":123857,"x":-22330.001953125,"y":123857.1640625,"z":15760.306640625,"formId":0x00017353},
    {"name":"Nornalhorst","approxX":-22022,"approxY":-3073,"x":-22022.431640625,"y":-3072.726806640625,"z":5892.08447265625,"formId":0x0001755f},
    {"name":"Fanacasecul","approxX":-6018,"approxY":49096,"x":-6018.392578125,"y":49096.31640625,"z":435.0080261230469,"formId":0x0001758f},
    {"name":"Piukanda","approxX":486,"approxY":108253,"x":486.1808776855469,"y":108253.3515625,"z":10740.0595703125,"formId":0x00017594},
    {"name":"Vindasel","approxX":2118,"approxY":30391,"x":2118.09716796875,"y":30390.572265625,"z":651.7816162109375,"formId":0x000175a6},
    {"name":"Rielle","approxX":6418,"approxY":157370,"x":6417.95263671875,"y":157370.078125,"z":27792.09375,"formId":0x00017588},
    {"name":"Nenyond Twyll","approxX":9558,"approxY":1936,"x":9557.951171875,"y":1936.2042236328125,"z":3975.63232421875,"formId":0x00017580},
    {"name":"Wenyandawik","approxX":35066,"approxY":-17990,"x":35066.07421875,"y":-17989.93359375,"z":2996.690185546875,"formId":0x0001720a},
    {"name":"Sercen","approxX":36376,"approxY":103358,"x":36375.9921875,"y":103358.015625,"z":2520.884033203125,"formId":0x00017587},
    {"name":"Sardavar Leed","approxX":38875,"approxY":19722,"x":38875.44140625,"y":19722.244140625,"z":1523.248779296875,"formId":0x00017209},
    {"name":"Anga","approxX":45783,"approxY":121154,"x":45783.1796875,"y":121153.8515625,"z":13097.779296875,"formId":0x0001735f},
    {"name":"Vilverin","approxX":50804,"approxY":87399,"x":50803.87109375,"y":87399.3203125,"z":409.95947265625,"formId":0x0006b588},
    {"name":"Anutwyll","approxX":58890,"approxY":-27120,"x":58890.1875,"y":-27120.376953125,"z":1216.538818359375,"formId":0x00017570},
    {"name":"Culotte","approxX":76493,"approxY":15095,"x":76493.1875,"y":15095.349609375,"z":362.7022705078125,"formId":0x00017357},
    {"name":"Telepe","approxX":77697,"approxY":-131254,"x":77697.4140625,"y":-131253.953125,"z":2233.9501953125,"formId":0x00017584},
    {"name":"Belda","approxX":81088,"approxY":94412,"x":81088.2734375,"y":94411.984375,"z":10690.080078125,"formId":0x00017577},
    {"name":"Nagastani","approxX":82196,"approxY":66339,"x":82196.046875,"y":66338.8671875,"z":4635.47705078125,"formId":0x000ad3e5},
    {"name":"Bawn","approxX":83932,"approxY":-53992,"x":83931.703125,"y":-53991.5625,"z":787.6802978515625,"formId":0x00017564},
    {"name":"Sedor","approxX":88106,"approxY":134540,"x":88106.0703125,"y":134539.59375,"z":26066.625,"formId":0x000a3520},
    {"name":"Nornal","approxX":99206,"approxY":41665,"x":99205.59375,"y":41665.0078125,"z":5069.95556640625,"formId":0x000175a9},
    {"name":"Veyond","approxX":111901,"approxY":-126115,"x":111900.9375,"y":-126114.7578125,"z":1808.5927734375,"formId":0x000175ad},
    {"name":"Arpenia","approxX":112133,"approxY":-96023,"x":112133.4140625,"y":-96023.3359375,"z":2389.44677734375,"formId":0x000175aa},
    {"name":"Nenalata","approxX":113406,"approxY":-23533,"x":113406.4453125,"y":-23532.900390625,"z":79.0096435546875,"formId":0x00017597},
    {"name":"Morahame","approxX":123658,"approxY":-42816,"x":123658,"y":-42816.40625,"z":1503.491943359375,"formId":0x00017573},
    {"name":"Atatar","approxX":125078,"approxY":-85678,"x":125078,"y":-85678.3125,"z":6036.291015625,"formId":0x00017593},
    {"name":"Fanacas","approxX":127902,"approxY":118634,"x":127902.0859375,"y":118633.765625,"z":14873.25,"formId":0x0001735d},
    {"name":"Mackamentain","approxX":132777,"approxY":5416,"x":132776.546875,"y":5415.71337890625,"z":4767.23388671875,"formId":0x00017355},
    {"name":"Kemen","approxX":139963,"approxY":95061,"x":139962.671875,"y":95061.2421875,"z":15446.8212890625,"formId":0x00017560},
    {"name":"Welke","approxX":145671,"approxY":-71491,"x":145670.828125,"y":-71491.3125,"z":1764.1158447265625,"formId":0x00017351},
    {"name":"Ondo","approxX":161452,"approxY":-5599,"x":161451.53125,"y":-5599.02734375,"z":1867.200439453125,"formId":0x0001757c},
    {"name":"Wendelbek","approxX":162799,"approxY":-51156,"x":162799.171875,"y":-51155.7734375,"z":1120,"formId":0x0001756c},
    {"name":"Hame","approxX":165768,"approxY":34317,"x":165767.9375,"y":34317.3984375,"z":9879.6513671875,"formId":0x0001756b},
    {"name":"Malada","approxX":189649,"approxY":-3042,"x":189649.1875,"y":-3041.702880859375,"z":5892.9150390625,"formId":0x0002af0b},
    {"name":"Lord Drad's Estate","approxX":-194890,"approxY":3173,"x":-194889.703125,"y":3172.586669921875,"z":4688,"formId":0x0003756b},
    {"name":"Whitmond Farm","approxX":-190992,"approxY":-23135,"x":-190991.546875,"y":-23135.77734375,"z":1148.4501953125,"formId":0x000177b0},
    {"name":"Gweden Farm","approxX":-169688,"approxY":-42808,"x":-169688.359375,"y":-42807.96875,"z":4437.8896484375,"formId":0x00090c8d},
    {"name":"Shetcombe Farm","approxX":-130594,"approxY":-4228,"x":-130593.5,"y":-4228.94091796875,"z":8426.38671875,"formId":0x000177ad},
    {"name":"Shardrock","approxX":-108307,"approxY":9418,"x":-108307.0390625,"y":9418.0546875,"z":6801.17724609375,"formId":0x000177a5},
    {"name":"Weatherleah","approxX":-75742,"approxY":53615,"x":-75741.5625,"y":53614.74609375,"z":9702.1767578125,"formId":0x0003f27f},
    {"name":"Hackdirt","approxX":-67107,"approxY":64130,"x":-67106.703125,"y":64129.62109375,"z":9792,"formId":0x00028552},
    {"name":"Brindle Home","approxX":-55105,"approxY":43030,"x":-55104.93359375,"y":43029.7421875,"z":7869.888671875,"formId":0x0001779d},
    {"name":"Odiil Farm","approxX":-50069,"approxY":82399,"x":-50069.09375,"y":82399.4375,"z":10531.1845703125,"formId":0x000ac549},
    {"name":"Gottlefont Priory","approxX":-43211,"approxY":44170,"x":-43210.8359375,"y":44170.15625,"z":8070.046875,"formId":0x0001779c},
    {"name":"Weye","approxX":1152,"approxY":63488,"x":1152,"y":63488,"z":831.1402587890625,"formId":0x000ac544},
    {"name":"Applewatch","approxX":6064,"approxY":150297,"x":6063.92236328125,"y":150297.28125,"z":26881.458984375,"formId":0x000177a3},
    {"name":"Aleswell","approxX":13009,"approxY":102949,"x":13009.2021484375,"y":102949.171875,"z":9056,"formId":0x00030027},
    {"name":"Cloud Ruler Temple","approxX":13391,"approxY":160255,"x":13391.1796875,"y":160254.921875,"z":31609.86328125,"formId":0x000177ab},
    {"name":"Pell's Gate","approxX":21348,"approxY":24504,"x":21347.560546875,"y":24504.357421875,"z":557.8787841796875,"formId":0x000177ae},
    {"name":"Bleaker's Way","approxX":28506,"approxY":119103,"x":28505.6171875,"y":119102.7890625,"z":9770.787109375,"formId":0x00017799},
    {"name":"Border Watch","approxX":72100,"approxY":-112809,"x":72100.3828125,"y":-112809.1328125,"z":2204.73095703125,"formId":0x0001779f},
    {"name":"Roland Jenseric's Cabin","approxX":75723,"approxY":83177,"x":75722.9921875,"y":83177.296875,"z":5661.14306640625,"formId":0x000ac548},
    {"name":"Harm's Folly","approxX":78518,"approxY":106584,"x":78518.1171875,"y":106584.421875,"z":12024,"formId":0x000177a0},
    {"name":"Greyland","approxX":79814,"approxY":-145008,"x":79814.625,"y":-145008.453125,"z":1276.9169921875,"formId":0x000177a2},
    {"name":"Water's Edge","approxX":81881,"approxY":-112732,"x":81881.0078125,"y":-112732.109375,"z":48.2900390625,"formId":0x000177a1},
    {"name":"White Stallion Lodge","approxX":82555,"approxY":-126520,"x":82555.859375,"y":-126520.015625,"z":226.5089874267578,"formId":0x000908c2},
    {"name":"Cropsford","approxX":88670,"approxY":20963,"x":88669.9921875,"y":20962.703125,"z":1287.358154296875,"formId":0x0000ab52},
    {"name":"Blankenmarch","approxX":109164,"approxY":-120857,"x":109164.0703125,"y":-120857.0078125,"z":2090.084228515625,"formId":0x000177a4},
    {"name":"Knights of the Thorn Lodge","approxX":110810,"approxY":95984,"x":110809.75,"y":95984.8046875,"z":8368.025390625,"formId":0x000c431b},
    {"name":"Cadlew Chapel","approxX":112467,"approxY":-19491,"x":112466.8984375,"y":-19490.5625,"z":869.18017578125,"formId":0x000cd529},
    {"name":"Temple of the Ancestor Moths","approxX":118870,"approxY":146791,"x":118870.0546875,"y":146790.859375,"z":20009.388671875,"formId":0x000177a8},
    {"name":"Harlun's Watch","approxX":119838,"approxY":80270,"x":119837.9140625,"y":80270.03125,"z":6365.85791015625,"formId":0x000177a6},
    {"name":"Lord Rugdumph's Estate","approxX":121678,"approxY":127784,"x":121678.09375,"y":127783.5546875,"z":14436.15234375,"formId":0x000177a7},
    {"name":"Drakelowe","approxX":126172,"approxY":44026,"x":126171.859375,"y":44026.453125,"z":1775.615234375,"formId":0x000177b1},
    {"name":"Malacath's Shrine","approxX":-202274,"approxY":10675,"x":-202273.9375,"y":10675.3662109375,"z":5777.3662109375,"formId":0x0003b369},
    {"name":"Meridia's Shrine","approxX":-97994,"approxY":7969,"x":-97993.875,"y":7968.81005859375,"z":7748.00439453125,"formId":0x0003b36b},
    {"name":"Sanguine's Shrine","approxX":-85773,"approxY":37435,"x":-85773.0546875,"y":37434.93359375,"z":11471.9951171875,"formId":0x00097008},
    {"name":"Hermaeus Mora's Shrine","approxX":-47329,"approxY":159680,"x":-47328.83203125,"y":159679.59375,"z":38712,"formId":0x0003b366},
    {"name":"Molag Bal's Shrine","approxX":-47106,"approxY":53565,"x":-47106.33203125,"y":53564.984375,"z":10275.9052734375,"formId":0x0003b368},
    {"name":"Clavicus Vile's Shrine","approxX":-13291,"approxY":34720,"x":-13291.236328125,"y":34720.03515625,"z":1897.672607421875,"formId":0x0003b365},
    {"name":"Hircine's Shrine","approxX":42999,"approxY":10811,"x":42999.3203125,"y":10811.0185546875,"z":4296,"formId":0x0003b367},
    {"name":"Namira's Shrine","approxX":48022,"approxY":140655,"x":48021.7265625,"y":140655.34375,"z":22158.234375,"formId":0x0003b36c},
    {"name":"Mephala's Shrine","approxX":55326,"approxY":112149,"x":55326.19140625,"y":112149.171875,"z":9914.591796875,"formId":0x0003b36a},
    {"name":"Sheogorath's Shrine","approxX":76549,"approxY":-87857,"x":76549.171875,"y":-87857.1328125,"z":3392.38671875,"formId":0x0003b370},
    {"name":"Vaermina's Shrine","approxX":104676,"approxY":65675,"x":104676.4140625,"y":65674.578125,"z":1168,"formId":0x0003b371},
    {"name":"Nocturnal's Shrine","approxX":108568,"approxY":-105591,"x":108567.78125,"y":-105591.4609375,"z":3347.303955078125,"formId":0x0003b36d},
    {"name":"Azura's Shrine","approxX":111865,"approxY":138290,"x":111865.0625,"y":138289.625,"z":21816,"formId":0x0003b363},
    {"name":"Boethia's Shrine","approxX":153134,"approxY":47246,"x":153134.125,"y":47245.5078125,"z":16216,"formId":0x0003b364},
    {"name":"Peryite's Shrine","approxX":157339,"approxY":-19871,"x":157339.078125,"y":-19871.515625,"z":1123.439208984375,"formId":0x0003b36e},
    {"name":"Oblivion Gate - Bruma","approxX":30043,"approxY":143344,"x":30043.669921875,"y":143343.65625,"z":25607.818359375,"formId":0x0000cefa},
];
const ignoreLocs = [
    {"name":"A Strange Door","approxX":88984,"approxY":-34086,"x":88983.9765625,"y":-34085.59375,"z":578.5484619140625,"formId":436365},
    {"name":"Weynon Priory","approxX":-56998,"approxY":85907,"x":-56998.265625,"y":85906.7890625,"z":13311.2509765625,"formId":124653},
    {"name":"Anvil Lighthouse","approxX":-196733,"approxY":-37483,"x":-196733.453125,"y":-37483.18359375,"z":875.7548828125,"formId":344109},
];

const skills = [
    {"name":"Armorer","key":"armorer"},
    {"name":"Athletics","key":"athletics"},
    {"name":"Blade","key":"blade"},
    {"name":"Block","key":"block"},
    {"name":"Blunt","key":"blunt"},
    {"name":"Hand to Hand","key":"handToHand"},
    {"name":"Heavy Armor","key":"heavyArmor"},
    {"name":"Alchemy","key":"alchemy"},
    {"name":"Alteration","key":"alteration"},
    {"name":"Conjuration","key":"conjuration"},
    {"name":"Destruction","key":"destruction"},
    {"name":"Illusion","key":"illusion"},
    {"name":"Mysticism","key":"mysticism"},
    {"name":"Restoration","key":"restoration"},
    {"name":"Acrobatics","key":"acrobatics"},
    {"name":"Light Armor","key":"lightArmor"},
    {"name":"Marksman","key":"marksman"},
    {"name":"Mercantile","key":"mercantile"},
    {"name":"Security","key":"security"},
    {"name":"Sneak","key":"sneak"},
    {"name":"Speechcraft","key":"speechcraft"},
];

const gates = [
    {"name":"Random 1","formId":0x0018d329,"x":141293.578125,"y":-101356.3515625,"z":3079.345458984375,"fixed":false,"ignore":false,"fame":1,"marker":0x000038bb},
    {"name":"Random 2","formId":0x0018b73e,"x":113091.1640625,"y":-153306.796875,"z":3306.113525390625,"fixed":false,"ignore":false,"fame":1,"marker":0x000038af},
    {"name":"Random 3","formId":0x0018d320,"x":118888.6953125,"y":-100802.6640625,"z":4712.21484375,"fixed":false,"ignore":false,"fame":1,"marker":0x000038b8},
    {"name":"Random 4","formId":0x0018d322,"x":105280.3671875,"y":-112374.234375,"z":3814.369140625,"fixed":false,"ignore":false,"fame":1,"marker":0x000038b6},
    {"name":"Random 5","formId":0x0018b742,"x":95890.6953125,"y":-132405.96875,"z":132.55226135253906,"fixed":false,"ignore":false,"fame":1,"marker":0x000038ae},
    {"name":"Random 6","formId":0x000614cd,"x":150076.234375,"y":-88088.2890625,"z":1640.1759033203125,"fixed":false,"ignore":false,"fame":1,"marker":0x000038c5},
    {"name":"Random 7","formId":0x000614ce,"x":107361.703125,"y":-74719.5390625,"z":910.1870727539062,"fixed":false,"ignore":false,"fame":1,"marker":0x000038be},
    {"name":"Random 8","formId":0x0018b740,"x":78572.3125,"y":-100260.40625,"z":1661.990234375,"fixed":false,"ignore":false,"fame":1,"marker":0x000038ac},
    {"name":"Random 9","formId":0x00061699,"x":122686.9296875,"y":-57728.05859375,"z":712.4056396484375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039fc},
    {"name":"Random 10","formId":0x000616ab,"x":136998.984375,"y":-42674.55859375,"z":7510.59765625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039fd},
    {"name":"Random 11","formId":0x000616e6,"x":181619.96875,"y":-40454.046875,"z":3917.16748046875,"fixed":false,"ignore":false,"fame":1,"marker":0x00003a00},
    {"name":"Random 12","formId":0x000608eb,"x":125138.296875,"y":-6033.13720703125,"z":5840.73583984375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039fb},
    {"name":"Random 13","formId":0x000616bf,"x":171190.5,"y":-9684.1875,"z":2540.18896484375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039fe},
    {"name":"Random 14","formId":0x000623c2,"x":83171.734375,"y":2814.776611328125,"z":957.9786376953125,"fixed":false,"ignore":false,"fame":1,"marker":0x00003963},
    {"name":"Random 15","formId":0x000608d5,"x":125357.3203125,"y":14400.2900390625,"z":4282.0068359375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039fa},
    {"name":"Random 16","formId":0x0018b0c3,"x":42965.9140625,"y":-18390.56640625,"z":1662.5374755859375,"fixed":false,"ignore":false,"fame":1,"marker":0x000038ff},
    {"name":"Random 17","formId":0x000616d1,"x":145071.6875,"y":23848.962890625,"z":9755.607421875,"fixed":false,"ignore":false,"fame":1,"marker":0x000039ff},
    {"name":"Random 18","formId":0x000623b8,"x":60005.15625,"y":9334.4912109375,"z":1088.9501953125,"fixed":false,"ignore":false,"fame":1,"marker":0x00003940},
    {"name":"Random 19","formId":0x000608bd,"x":103537.6640625,"y":27295.3125,"z":3946.0556640625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039f9},
    {"name":"Random 20","formId":0x000645a3,"x":161489.734375,"y":30673.912109375,"z":5436.09375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039c9},
    {"name":"Random 21","formId":0x0005160d,"x":22505.849609375,"y":-14470.005859375,"z":4275.5244140625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039ce},
    {"name":"Random 22","formId":0x000608a8,"x":80354.625,"y":27102.486328125,"z":2119.716552734375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039f8},
    {"name":"Random 23","formId":0x0018884f,"x":5611.3310546875,"y":-6122.7978515625,"z":5685.6708984375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039cb},
    {"name":"Random 24","formId":0x000521a8,"x":-3285.33056640625,"y":-15645.8359375,"z":1629.400146484375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039d0},
    {"name":"Random 25","formId":0x0018d1c6,"x":87901.9609375,"y":47462.109375,"z":2282.1201171875,"fixed":false,"ignore":false,"fame":1,"marker":0x000039f7},
    {"name":"Random 26","formId":0x0018bb6b,"x":18266.619140625,"y":15213.751953125,"z":1141.925048828125,"fixed":false,"ignore":false,"fame":1,"marker":0x00003905},
    {"name":"Random 27","formId":0x00051262,"x":-18051.392578125,"y":-22607.421875,"z":2291.93212890625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039cd},
    {"name":"Random 28","formId":0x0018d18d,"x":120386.0625,"y":60708.41015625,"z":1275.0576171875,"fixed":false,"ignore":false,"fame":1,"marker":0x000039f1},
    {"name":"Random 29","formId":0x000623ba,"x":48126.35546875,"y":41295.46484375,"z":903.3193969726562,"fixed":false,"ignore":false,"fame":1,"marker":0x0000394b},
    {"name":"Random 30","formId":0x0018bd37,"x":-14858.0205078125,"y":-6143.5654296875,"z":4721.7548828125,"fixed":false,"ignore":false,"fame":1,"marker":0x000039cc},
    {"name":"Random 31","formId":0x000623c0,"x":79333.5078125,"y":62531.8125,"z":4265.8583984375,"fixed":false,"ignore":false,"fame":1,"marker":0x0000395a},
    {"name":"Random 32","formId":0x0018d172,"x":111040.0859375,"y":71199.96875,"z":5595.734375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039ee},
    {"name":"Random 33","formId":0x0018b0c5,"x":-6590.0048828125,"y":18150.77734375,"z":3490.694091796875,"fixed":false,"ignore":false,"fame":1,"marker":0x00003906},
    {"name":"Random 34","formId":0x0018d19f,"x":127412.0390625,"y":76161.265625,"z":1352.9541015625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039f5},
    {"name":"Random 35","formId":0x000517b5,"x":-36001.39453125,"y":-9942.849609375,"z":4923.73095703125,"fixed":false,"ignore":false,"fame":1,"marker":0x000039cf},
    {"name":"Random 36","formId":0x00055d87,"x":-39688.4296875,"y":1589.4639892578125,"z":6147.8759765625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039d1},
    {"name":"Random 37","formId":0x000623be,"x":69197.140625,"y":85610.0078125,"z":5735.15771484375,"fixed":false,"ignore":false,"fame":1,"marker":0x00003959},
    {"name":"Random 38","formId":0x000645d6,"x":140283.9375,"y":104319.2265625,"z":18552.685546875,"fixed":false,"ignore":false,"fame":1,"marker":0x000039c8},
    {"name":"Random 39","formId":0x000623bc,"x":55484.09765625,"y":93189.625,"z":954.7640991210938,"fixed":false,"ignore":false,"fame":1,"marker":0x00003957},
    {"name":"Random 40","formId":0x0018d1b4,"x":121662.9609375,"y":108618.8046875,"z":7764.806640625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039f6},
    {"name":"Random 41","formId":0x0018d8c4,"x":88181.3359375,"y":104473.4765625,"z":9851.34765625,"fixed":false,"ignore":false,"fame":1,"marker":0x00003910},
    {"name":"Random 42","formId":0x00057038,"x":-54347.45703125,"y":14582.044921875,"z":5846.3193359375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039d2},
    {"name":"Random 43","formId":0x0018b0c6,"x":-36115.1328125,"y":38693.50390625,"z":6171.63037109375,"fixed":false,"ignore":false,"fame":1,"marker":0x00003907},
    {"name":"Random 44","formId":0x0018bb70,"x":72950.96875,"y":113880.265625,"z":16256.6796875,"fixed":false,"ignore":false,"fame":1,"marker":0x00003930},
    {"name":"Random 45","formId":0x0005a68e,"x":-87320.8671875,"y":-5445.39306640625,"z":6729.1083984375,"fixed":false,"ignore":false,"fame":1,"marker":0x000039eb},
    {"name":"Random 46","formId":0x0018bb72,"x":-25535.50390625,"y":72152.5703125,"z":6680.076171875,"fixed":false,"ignore":false,"fame":1,"marker":0x00003909},
    {"name":"Random 47","formId":0x0018d8c7,"x":23547.599609375,"y":107514.40625,"z":6401.87158203125,"fixed":false,"ignore":false,"fame":1,"marker":0x00003915},
    {"name":"Random 48","formId":0x000643f2,"x":96512.5703125,"y":129143.3359375,"z":27016.23046875,"fixed":false,"ignore":false,"fame":1,"marker":0x0000398d},
    {"name":"Random 49","formId":0x0005a376,"x":-90052.828125,"y":4506.63330078125,"z":7258.080078125,"fixed":false,"ignore":false,"fame":1,"marker":0x000039ea},
    {"name":"Random 50","formId":0x00057388,"x":-84131.7421875,"y":17762.40234375,"z":5820.7548828125,"fixed":false,"ignore":false,"fame":1,"marker":0x000039e8},
    {"name":"Random 51","formId":0x0018d8c6,"x":-4725.54736328125,"y":103228.625,"z":7554.90576171875,"fixed":false,"ignore":false,"fame":1,"marker":0x0000390d},
    {"name":"Random 52","formId":0x000836d3,"x":-38813.80859375,"y":84319.359375,"z":8664.7275390625,"fixed":false,"ignore":false,"fame":1,"marker":0x000038f6},
    {"name":"Random 53","formId":0x0018bb6d,"x":38268.12109375,"y":130053,"z":16897.720703125,"fixed":false,"ignore":false,"fame":1,"marker":0x0000392d},
    {"name":"Random 54","formId":0x000645ce,"x":112352.0859375,"y":149102.46875,"z":21431.541015625,"fixed":false,"ignore":false,"fame":1,"marker":0x000039c7},
    {"name":"Random 55","formId":0x000615ec,"x":-96440.0625,"y":34348.9296875,"z":14050.732421875,"fixed":false,"ignore":false,"fame":1,"marker":0x000038f0},
    {"name":"Random 56","formId":0x000615eb,"x":-96341.609375,"y":46057.6484375,"z":9877.91015625,"fixed":false,"ignore":false,"fame":1,"marker":0x000038ef},
    {"name":"Random 57","formId":0x000613fa,"x":-142911.71875,"y":-37260.73046875,"z":5375.56298828125,"fixed":false,"ignore":false,"fame":1,"marker":0x000039ec},
    {"name":"Random 58","formId":0x000615e1,"x":-137468.921875,"y":2519.621337890625,"z":6948.8515625,"fixed":false,"ignore":false,"fame":1,"marker":0x000038c6},
    {"name":"Random 59","formId":0x0018b244,"x":-157883.390625,"y":-51136.92578125,"z":1023.0916137695312,"fixed":false,"ignore":false,"fame":1,"marker":0x00014d1b},
    {"name":"Random 60","formId":0x000615ea,"x":-88894.9453125,"y":75322.5703125,"z":13670.283203125,"fixed":false,"ignore":false,"fame":1,"marker":0x000038eb},
    {"name":"Random 61","formId":0x0006440e,"x":5706.87890625,"y":146405.203125,"z":28230.611328125,"fixed":false,"ignore":false,"fame":1,"marker":0x0000398e},
    {"name":"Random 62","formId":0x0006253d,"x":-79923.4609375,"y":100300.0234375,"z":16159.2646484375,"fixed":false,"ignore":false,"fame":1,"marker":0x000038e6},
    {"name":"Random 63","formId":0x00062541,"x":-112409.6875,"y":67079.9296875,"z":23380.421875,"fixed":false,"ignore":false,"fame":1,"marker":0x000038d9},
    {"name":"Random 64","formId":0x0018b246,"x":-153185.890625,"y":2400.005126953125,"z":7426.37255859375,"fixed":false,"ignore":false,"fame":1,"marker":0x00014d19},
    {"name":"Random 65","formId":0x000615e4,"x":-125678.4375,"y":49946.15234375,"z":19347.333984375,"fixed":false,"ignore":false,"fame":1,"marker":0x000038ce},
    {"name":"Random 66","formId":0x000643dc,"x":-30065.298828125,"y":146012.6875,"z":32908.46484375,"fixed":false,"ignore":false,"fame":1,"marker":0x0000398c},
    {"name":"Random 67","formId":0x0018b243,"x":-177901.140625,"y":-46889.640625,"z":4137.974609375,"fixed":false,"ignore":false,"fame":1,"marker":0x00014d1c},
    {"name":"Random 68","formId":0x000615e3,"x":-146164.09375,"y":35164.79296875,"z":13942.9833984375,"fixed":false,"ignore":false,"fame":1,"marker":0x000038cd},
    {"name":"Random 69","formId":0x0006253c,"x":-80493.7265625,"y":116829.34375,"z":19001.509765625,"fixed":false,"ignore":false,"fame":1,"marker":0x000038db},
    {"name":"Random 70","formId":0x0018b247,"x":-158668.375,"y":17175.6875,"z":8889.4208984375,"fixed":false,"ignore":false,"fame":1,"marker":0x00014d18},
    {"name":"Random 71","formId":0x0006253f,"x":-95777.4609375,"y":104231.0234375,"z":19513.4140625,"fixed":false,"ignore":false,"fame":1,"marker":0x000038da},
    {"name":"Random 72","formId":0x000615e8,"x":-64205.21875,"y":133134.109375,"z":28962.486328125,"fixed":false,"ignore":false,"fame":1,"marker":0x000038e8},
    {"name":"Random 73","formId":0x0018b24a,"x":-177933.765625,"y":-18267.12890625,"z":5435.20068359375,"fixed":false,"ignore":false,"fame":1,"marker":0x000cd413},
    {"name":"Random 74","formId":0x00064416,"x":-59881.5078125,"y":153499.375,"z":40116.82421875,"fixed":false,"ignore":false,"fame":1,"marker":0x000039b5},
    {"name":"Random 75","formId":0x0018b249,"x":-202214.671875,"y":1288.3956298828125,"z":7381.740234375,"fixed":false,"ignore":false,"fame":1,"marker":0x00014d15},
    {"name":"Random 76","formId":0x0018d328,"x":121965.1171875,"y":-174993.09375,"z":372.8039855957031,"fixed":false,"ignore":false,"fame":1,"marker":0x000038b1},
    {"name":"Random 77","formId":0x0018d326,"x":132281.375,"y":-169258.828125,"z":2311.512451171875,"fixed":false,"ignore":false,"fame":1,"marker":0x000038b2},
    {"name":"Random 78","formId":0x0018b248,"x":-194576.59375,"y":26228.734375,"z":5925.1259765625,"fixed":false,"ignore":false,"fame":1,"marker":0x00014d17},
    {"name":"Random 79","formId":0x000616ff,"x":203310.078125,"y":-10068.916015625,"z":7752.30419921875,"fixed":false,"ignore":false,"fame":1,"marker":0x00003a02},
    {"name":"Random 80","formId":0x0018b73c,"x":109217.0859375,"y":-165928.6875,"z":2777.45751953125,"fixed":false,"ignore":false,"fame":1,"marker":0x000038B0},
    {"name":"Great Gate","formId":0x0002756e,"x":37607.65234375,"y":155650.375,"z":24803.705078125,"fixed":true,"ignore":false,"fame":0},
    {"name":"Anvil","formId":0x00026ebf,"x":-202755.453125,"y":-22498.0078125,"z":2038.662109375,"fixed":true,"ignore":false,"fame":2,"marker":0x000cd414},
    {"name":"Bravil","formId":0x00026ebe,"x":71020.859375,"y":-26094.0703125,"z":1443.209716796875,"fixed":true,"ignore":false,"fame":2,"marker":0x0000cef9},
    {"name":"Bruma","formId":0x00026eba,"x":30494.984375,"y":142150.875,"z":25440.158203125,"fixed":true,"ignore":false,"fame":1,"marker":0x0000cefa},
    {"name":"Cheydinhal","formId":0x00026f12,"x":107696,"y":96064,"z":7840,"fixed":true,"ignore":false,"fame":1,"marker":0x0000cef8},
    {"name":"Chorrol","formId":0x000270f7,"x":-62942.66015625,"y":84015.09375,"z":14557.5185546875,"fixed":true,"ignore":false,"fame":2,"marker":0x0000cefb},
    {"name":"Fixed 1","formId":0x0005403e,"x":-186551.671875,"y":14953.7685546875,"z":4675.412109375,"fixed":true,"ignore":false,"fame":1,"marker":0x0000cd09},
    {"name":"Fixed 2","formId":0x0018b245,"x":-165790.015625,"y":-22401.345703125,"z":4945.55615234375,"fixed":true,"ignore":false,"fame":1,"marker":0x00014d1a},
    {"name":"Fixed 3","formId":0x000615e2,"x":-120998.96875,"y":26771.134765625,"z":10227.3798828125,"fixed":true,"ignore":false,"fame":1,"marker":0x000038cc},
    {"name":"Fixed 4","formId":0x00188824,"x":-100435.1171875,"y":14644.9404296875,"z":6687.84228515625,"fixed":true,"ignore":false,"fame":1,"marker":0x000039ca},
    {"name":"Fixed 5","formId":0x000572ee,"x":-70313.46875,"y":28187.689453125,"z":7060.0107421875,"fixed":true,"ignore":false,"fame":1,"marker":0x000039d3},
    {"name":"Fixed 6","formId":0x00188742,"x":-55385.6953125,"y":63701.48046875,"z":10662.654296875,"fixed":true,"ignore":false,"fame":1,"marker":0x000038fe},
    {"name":"Fixed 7","formId":0x0018adff,"x":30226.275390625,"y":1692.5350341796875,"z":4019.014404296875,"fixed":true,"ignore":false,"fame":1,"marker":0x00003967},
    {"name":"Fixed 8","formId":0x000623b6,"x":64617.67578125,"y":-5149.447265625,"z":2909.82177734375,"fixed":true,"ignore":false,"fame":1,"marker":0x00003937},
    {"name":"Fixed 9","formId":0x0018ae1c,"x":79904.734375,"y":149113.65625,"z":34027.01171875,"fixed":true,"ignore":false,"fame":1,"marker":0x00003986},
    {"name":"Fixed 10","formId":0x0018a833,"x":125007.1484375,"y":-145395.1875,"z":3129.884033203125,"fixed":true,"ignore":false,"fame":1,"marker":0x000038a9},
    {"name":"Fixed 11","formId":0x0018d324,"x":138824.3125,"y":-133084.34375,"z":3410.793212890625,"fixed":true,"ignore":false,"fame":1,"marker":0x000038b4},
    {"name":"Kvatch","formId":0x0001e8a3,"x":-144798.609375,"y":-16498.912109375,"z":11381.1650390625,"fixed":true,"ignore":false,"fame":1,"marker":0x0000cef7},
    {"name":"Leyawiin","formId":0x00026f13,"x":104616.8125,"y":-137432.9375,"z":22.773895263671875,"fixed":true,"ignore":false,"fame":2,"marker":0x0000cefc},
    {"name":"Skingrad","formId":0x000270f8,"x":-50863.38671875,"y":2395.401611328125,"z":7920.20751953125,"fixed":true,"ignore":false,"fame":2,"marker":0x0000cefd},
    {"name":"Extra Great Gate 1","formId":0x00027574,"x":37432.85546875,"y":154204.671875,"z":24496.640625,"fixed":false,"ignore":true,"fame":0},
    {"name":"Extra Great Gate 2","formId":0x0002756f,"x":37983.34765625,"y":156036.046875,"z":24565.353515625,"fixed":false,"ignore":true,"fame":0},
    {"name":"Extra Great Gate 3","formId":0x00027571,"x":36074.6953125,"y":155623.78125,"z":24472.708984375,"fixed":false,"ignore":true,"fame":0},
];

const horses = [
    {"formId":0x00032bf5,"name":"shadowmere"},
    {"formId":0x00054226,"name":"bruma"},
    {"formId":0x0004e28e,"name":"anvil"},
    {"formId":0x0004e28f,"name":"bravil"},
    {"formId":0x00053232,"name":"leyawiin"},
    {"formId":0x0004bf2f,"name":"cheydinhal"},
    {"formId":0x000545d6,"name":"skingraad"},
    {"formId":0x0004de96,"name":"chorrol"},
];

const investments = [
    {"formId":0x0003630B,"city":"Anvil","store":"Morvayn's Peacemakers","name":"Enilroth"},
    {"formId":0x0002D06C,"city":"Anvil","store":"Anvil Mages Guild","name":"Felen Relas"},
    {"formId":0x0000BC7A,"city":"Anvil","store":"The Flowing Bowl","name":"Maenlorn"},
    {"formId":0x00035725,"city":"Anvil","store":"Lelles' Quality Merchandise","name":"Norbert Lelles"},
    {"formId":0x0003D7FD,"city":"Anvil","store":"Anvil Castle","name":"Orrin"},
    {"formId":0x0000BC6E,"city":"Anvil","store":"Morvayn's Peacemakers","name":"Varel Morvayn"},
    {"formId":0x0000BC76,"city":"Anvil","store":"The Count's Arms","name":"Wilbur"},
    {"formId":0x0002F080,"city":"Bravil","store":"Bravil Mages Guild","name":"Ardaline"},
    {"formId":0x0000A117,"city":"Bravil","store":"The Lonely Suitor Lodge","name":"Bogrum Gro-Galash"},
    {"formId":0x0000A11C,"city":"Bravil","store":"The Archer's Paradox","name":"Daenlin"},
    {"formId":0x0000A129,"city":"Bravil","store":"Silverhome on the Water","name":"Gilgondorin"},
    {"formId":0x0000A130,"city":"Bravil","store":"Luciana Galena's House","name":"Luciana Galena"},
    {"formId":0x0000A123,"city":"Bravil","store":"The Fair Deal","name":"Nilawen"},
    {"formId":0x0003E180,"city":"Bravil","store":"Alley next to The Fair Deal","name":"Nordinor"},
    {"formId":0x0000A118,"city":"Bravil","store":"Bravil Fighters Guild","name":"Tadrose Helas"},
    {"formId":0x00036262,"city":"Bruma","store":"Hammer and Axe","name":"Fjotreid"},
    {"formId":0x0003626B,"city":"Bruma","store":"Jerall View Inn","name":"Hafid Hollowleg"},
    {"formId":0x0003E18F,"city":"Bruma","store":"Novaroma","name":"Karinnarre"},
    {"formId":0x0003626E,"city":"Bruma","store":"Olav's Tap and Tack","name":"Olav"},
    {"formId":0x00036266,"city":"Bruma","store":"Nord Winds","name":"Olfand"},
    {"formId":0x00036285,"city":"Bruma","store":"Ongar's House","name":"Ongar the World-Weary"},
    {"formId":0x00003461,"city":"Bruma","store":"Bruma Mages Guild","name":"Selena Orania"},
    {"formId":0x00036265,"city":"Bruma","store":"Nord Winds","name":"Skjorta"},
    {"formId":0x00036267,"city":"Bruma","store":"Novaroma","name":"Suurootan"},
    {"formId":0x00003644,"city":"Cheydinhal","store":"Borba's Goods and Stores","name":"Borba gra-Uzgash"},
    {"formId":0x00003639,"city":"Cheydinhal","store":"Newlands Lodge","name":"Dervera Romalen"},
    {"formId":0x0000364A,"city":"Cheydinhal","store":"Cheydinhal Mages Guild","name":"Eilonwy"},
    {"formId":0x00003641,"city":"Cheydinhal","store":"Mach-Na's Books","name":"Mach-Na"},
    {"formId":0x0003E191,"city":"Cheydinhal","store":"Borba's Goods and Stores","name":"Magra gro-Naybek"},
    {"formId":0x00003654,"city":"Cheydinhal","store":"Cheydinhal Bridge Inn","name":"Mariana Ancharia"},
    {"formId":0x0000363B,"city":"Cheydinhal","store":"The March Rider","name":"Tertia Viducia"},
    {"formId":0x00023508,"city":"Chorrol","store":"Chorrol Mages Guild","name":"Angalmo"},
    {"formId":0x00023504,"city":"Chorrol","store":"The Grey Mare","name":"Emfrid"},
    {"formId":0x000234DB,"city":"Chorrol","store":"Renoit's Books","name":"Estelle Renoit"},
    {"formId":0x000234FC,"city":"Chorrol","store":"Fire and Steel","name":"Rasheda"},
    {"formId":0x0002350D,"city":"Chorrol","store":"Chorrol Fighters Guild","name":"Sabine Laul"},
    {"formId":0x000234FD,"city":"Chorrol","store":"Northern Goods and Trade","name":"Seed-Neeus"},
    {"formId":0x00023502,"city":"Chorrol","store":"The Oak and Crosier","name":"Talasma"},
    {"formId":0x0001D212,"city":"Imperial City, Market District","store":"The Gilded Carafe","name":"Claudette Perrick"},
    {"formId":0x0001D20D,"city":"Imperial City, Market District","store":"The Feed Bag","name":"Delos Fandas"},
    {"formId":0x0001D20F,"city":"Imperial City, Market District","store":"Red Diamond Jewelry","name":"Hamlof Red-Tooth"},
    {"formId":0x0001D20B,"city":"Imperial City, Market District","store":"Jensine's \"Good as New\" Merchandise","name":"Jensine"},
    {"formId":0x0001D211,"city":"Imperial City, Market District","store":"The Best Defense","name":"Maro Rufus"},
    {"formId":0x0001D159,"city":"Imperial City, Market District","store":"The Main Ingredient","name":"Ogier Georick"},
    {"formId":0x0001D207,"city":"Imperial City, Market District","store":"Divine Elegance","name":"Palonirya"},
    {"formId":0x0001D158,"city":"Imperial City, Market District","store":"First Edition","name":"Phintias"},
    {"formId":0x0001D15E,"city":"Imperial City, Market District","store":"Rindir's Staffs","name":"Rindir"},
    {"formId":0x0001D15A,"city":"Imperial City, Market District","store":"A Fighting Chance","name":"Rohssan"},
    {"formId":0x0001D209,"city":"Imperial City, Market District","store":"Three Brothers Trade Goods","name":"Sergius Verus"},
    {"formId":0x0001D20A,"city":"Imperial City, Market District","store":"Three Brothers Trade Goods","name":"Tertullian Verus"},
    {"formId":0x0001D15D,"city":"Imperial City, Market District","store":"The Copious Coinpurse","name":"Thoronir"},
    {"formId":0x0001D213,"city":"Imperial City, Market District","store":"Slash 'N Smash","name":"Urbul gro-Orkulg"},
    {"formId":0x0001D210,"city":"Imperial City, Market District","store":"The Best Defense","name":"Varnado"},
    {"formId":0x0001D15B,"city":"Imperial City, Market District","store":"The Merchants Inn","name":"Velus Hosidius"},
    {"formId":0x0001D15C,"city":"Imperial City, Market District","store":"Stonewall Shields","name":"Viator Accius"},
    {"formId":0x0002F878,"city":"Imperial City, Talos Plaza District","store":"The Tiber Septim Hotel","name":"Augusta Calidia"},
    {"formId":0x0000391B,"city":"Imperial City, Elven Gardens District","store":"Fathis Ules' House","name":"Fathis Ules"},
    {"formId":0x00024AC2,"city":"Imperial City, Arcane University","store":"Lustratorium","name":"Julienne Fanis"},
    {"formId":0x0001C4B2,"city":"Imperial City, Elven Gardens District","store":"The King and Queen Tavern","name":"Ley Marillin"},
    {"formId":0x0001C4B7,"city":"Imperial City, Elven Gardens District","store":"Luther Broad's Boarding House","name":"Luther Broad"},
    {"formId":0x00014730,"city":"Imperial City, Waterfront District","store":"The Bloated Float Inn","name":"Ormil"},
    {"formId":0x000C45B8,"city":"Imperial City, Outside","store":"Near Stables","name":"Shady Sam"},
    {"formId":0x0001D5B4,"city":"Imperial City, Temple District","store":"The All-Saints Inn","name":"Willet"},
    {"formId":0x0002ECB4,"city":"Kvatch","store":"Outside her tent","name":"Batul gra-Sharob"},
    {"formId":0x0002ECB7,"city":"Kvatch","store":"Refugee Camp","name":"Sigrid"},
    {"formId":0x000314E5,"city":"Leyawiin","store":"Leyawiin Mages Guild","name":"Alves Uvenim"},
    {"formId":0x0003E214,"city":"Leyawiin","store":"Southern Books","name":"Bugak gro-Bol"},
    {"formId":0x0003599B,"city":"Leyawiin","store":"Dar Jee's House","name":"Dar Jee"},
    {"formId":0x0003E185,"city":"Leyawiin","store":"Best Goods and Guarantees","name":"Elsynia"},
    {"formId":0x00035292,"city":"Leyawiin","store":"Best Goods and Guarantees","name":"Gundalas"},
    {"formId":0x000314E4,"city":"Leyawiin","store":"Leyawiin Mages Guild","name":"S'drassa"},
    {"formId":0x0003528D,"city":"Leyawiin","store":"Three Sisters' Inn","name":"Shuravi"},
    {"formId":0x00035294,"city":"Leyawiin","store":"The Dividing Line","name":"Tun-Zeeus"},
    {"formId":0x0002C8D9,"city":"Leyawiin","store":"Five Claws Lodge","name":"Witseidutsei"},
    {"formId":0x000389B9,"city":"N/A","store":"Faregyl Inn","name":"Abhuki"},
    {"formId":0x00031025,"city":"N/A","store":"The Drunken Dragon Inn","name":"Andreas Draconis"},
    {"formId":0x000243C9,"city":"Pell's Gate","store":"The Sleeping Mare","name":"Candice Corgine"},
    {"formId":0x0002DC05,"city":"N/A","store":"Brina Cross Inn","name":"Christophe Marane"},
    {"formId":0x0003AB4F,"city":"N/A","store":"Imperial Bridge Inn","name":"Davela Hlaren"},
    {"formId":0x00097009,"city":"N/A","store":"Shrine of Sanguine","name":"Engorm"},
    {"formId":0x000280E6,"city":"Hackdirt","store":"Moslin's Dry Goods","name":"Etira Moslin"},
    {"formId":0x0003AB52,"city":"N/A","store":"Gottshaw Inn","name":"Foroch"},
    {"formId":0x0009823E,"city":"Bleaker's Way","store":"Goodwill Inn","name":"Kirsten"},
    {"formId":0x00030021,"city":"N/A","store":"Roxey Inn","name":"Malene"},
    {"formId":0x00024FE1,"city":"N/A","store":"Inn of Ill Omen","name":"Manheim Maulhand"},
    {"formId":0x000BB9CC,"city":"Weye","store":"Wawnet Inn","name":"Nerussa"},
    {"formId":0x000897E8,"city":"Border Watch","store":"Border Watch Inn","name":"S'thasa"},
    {"formId":0x000280FC,"city":"Hackdirt","store":"Moslin's Inn","name":"Vlanhonder Moslin"},
    {"formId":0x00028F9A,"city":"Skingrad","store":"Hammer and Tongs","name":"Agnete the Pickled"},
    {"formId":0x00028F8F,"city":"Skingrad","store":"West Weald Inn","name":"Erina Jeranus"},
    {"formId":0x00028E74,"city":"Skingrad","store":"All Things Alchemical","name":"Falanu Hlaalu"},
    {"formId":0x00028F99,"city":"Skingrad","store":"Colovian Traders","name":"Gunder"},
    {"formId":0x00028F8B,"city":"Skingrad","store":"Two Sisters Lodge","name":"Mog gra-Mogakh"},
    {"formId":0x0003E92C,"city":"Skingrad","store":"West Weald Inn","name":"Sinderion"},
];

const books = [
    {"formId":0x000243cb,"name":"A Dance in Fire, v1","skill":"Acrobatics"},
    {"formId":0x000243cc,"name":"A Dance in Fire, v4","skill":"Acrobatics"},
    {"formId":0x000243ce,"name":"Mystery of Talara, v 1","skill":"Acrobatics"},
    {"formId":0x000243ca,"name":"Thief","skill":"Acrobatics"},
    {"formId":0x00073a5f,"name":"Calcinator Treatise","skill":"Alchemy"},
    {"formId":0x000243d2,"name":"De Rerum Dirennis","skill":"Alchemy"},
    {"formId":0x000243cf,"name":"A Game at Dinner","skill":"Alchemy"},
    {"formId":0x000243d0,"name":"Mannimarco, King of Worms","skill":"Alchemy"},
    {"formId":0x000243d1,"name":"Song of the Alchemists","skill":"Alchemy"},
    {"formId":0x000243d4,"name":"Daughter of the Niben","skill":"Alteration"},
    {"formId":0x000243d5,"name":"The Dragon Break","skill":"Alteration"},
    {"formId":0x000243d8,"name":"The Lunar Lorkhan","skill":"Alteration"},
    {"formId":0x00073a69,"name":"Reality & Other Falsehoods","skill":"Alteration"},
    {"formId":0x000243d6,"name":"Sithis","skill":"Alteration"},
    {"formId":0x000243d9,"name":"The Armorer's Challenge","skill":"Armorer"},
    {"formId":0x000243dc,"name":"Cherim's Heart of Anequina","skill":"Armorer"},
    {"formId":0x00073a68,"name":"Heavy Armor Repair","skill":"Armorer"},
    {"formId":0x000243da,"name":"Last Scabbard of Akrash","skill":"Armorer"},
    {"formId":0x00073a67,"name":"Light Armor Repair","skill":"Armorer"},
    {"formId":0x000243e2,"name":"The Argonian Account, Book 1","skill":"Athletics"},
    {"formId":0x000243e1,"name":"Beggar","skill":"Athletics"},
    {"formId":0x000243df,"name":"A Dance in Fire, v3","skill":"Athletics"},
    {"formId":0x000243de,"name":"The Ransom of Zarek","skill":"Athletics"},
    {"formId":0x000243e0,"name":"The Red Kitchen Reader","skill":"Athletics"},
    {"formId":0x000243e4,"name":"2920, Morning Star (v1)","skill":"Blade"},
    {"formId":0x00073a61,"name":"Battle of Sancre Tor","skill":"Blade"},
    {"formId":0x000243e5,"name":"Fire and Darkness","skill":"Blade"},
    {"formId":0x000243e6,"name":"Song Of Hrormir","skill":"Blade"},
    {"formId":0x000243e3,"name":"Words and Philosophy","skill":"Blade"},
    {"formId":0x000243ea,"name":"A Dance in Fire, v2","skill":"Block"},
    {"formId":0x000243e8,"name":"Death Blow of Abernanit","skill":"Block"},
    {"formId":0x000243e9,"name":"The Mirror","skill":"Block"},
    {"formId":0x000243ec,"name":"The Warp in the West","skill":"Block"},
    {"formId":0x000243eb,"name":"Warrior","skill":"Block"},
    {"formId":0x000243ee,"name":"The Importance of Where","skill":"Blunt"},
    {"formId":0x000243f0,"name":"King","skill":"Blunt"},
    {"formId":0x00073a62,"name":"The Legendary Sancre Tor","skill":"Blunt"},
    {"formId":0x00073a66,"name":"Mace Etiquette","skill":"Blunt"},
    {"formId":0x000243ef,"name":"Night Falls on Sentinel","skill":"Blunt"},
    {"formId":0x000243f5,"name":"2920, Frostfall (v10)","skill":"Conjuration"},
    {"formId":0x000243f4,"name":"2920, Hearth Fire (v9)","skill":"Conjuration"},
    {"formId":0x000243f2,"name":"The Doors of Oblivion","skill":"Conjuration"},
    {"formId":0x00073a60,"name":"Liminal Bridges","skill":"Conjuration"},
    {"formId":0x00022b04,"name":"Mythic Dawn Commentaries 1","skill":"Conjuration"},
    {"formId":0x000243f6,"name":"The Warrior's Charge","skill":"Conjuration"},
    {"formId":0x000243fa,"name":"The Art of War Magic","skill":"Destruction"},
    {"formId":0x000243f7,"name":"The Horrors of Castle Xyr","skill":"Destruction"},
    {"formId":0x000243f9,"name":"A Hypothetical Treachery","skill":"Destruction"},
    {"formId":0x000243fb,"name":"Mystery of Talara, v 3","skill":"Destruction"},
    {"formId":0x00022b05,"name":"Mythic Dawn Commentaries 2","skill":"Destruction"},
    {"formId":0x000243f8,"name":"Response to Bero's Speech","skill":"Destruction"},
    {"formId":0x000243fe,"name":"Ahzirr Traajijazeri","skill":"Hand to Hand"},
    {"formId":0x000243fc,"name":"Immortal Blood","skill":"Hand to Hand"},
    {"formId":0x00024400,"name":"Master Zoaraym's Tale","skill":"Hand to Hand"},
    {"formId":0x00073a6a,"name":"Way of the Exposed Palm","skill":"Hand to Hand"},
    {"formId":0x000243fd,"name":"The Wolf Queen, v 2","skill":"Hand to Hand"},
    {"formId":0x00024402,"name":"2920, MidYear (v6)","skill":"Heavy Armor"},
    {"formId":0x00024403,"name":"Chimarvamidium","skill":"Heavy Armor"},
    {"formId":0x000a915c,"name":"Fighters Guild History, 1st Ed.","skill":"Heavy Armor"},
    {"formId":0x00024401,"name":"Hallgerd's Tale","skill":"Heavy Armor"},
    {"formId":0x00024405,"name":"History of the Fighters Guild","skill":"Heavy Armor"},
    {"formId":0x00024404,"name":"How Orsinium Passed to Orcs","skill":"Heavy Armor"},
    {"formId":0x00024407,"name":"The Argonian Account, Book 3","skill":"Illusion"},
    {"formId":0x00024408,"name":"Incident in Necrom","skill":"Illusion"},
    {"formId":0x0002440a,"name":"Mystery of Talara, v 4","skill":"Illusion"},
    {"formId":0x00022b06,"name":"Mythic Dawn Commentaries 3","skill":"Illusion"},
    {"formId":0x00024409,"name":"Palla, volume 1","skill":"Illusion"},
    {"formId":0x00024406,"name":"The Wolf Queen, v 3","skill":"Illusion"},
    {"formId":0x0002440C,"name":"Ice and Chitin","skill":"Light Armor"},
    {"formId":0x0002440d,"name":"Lord Jornibret's Last Dance","skill":"Light Armor"},
    {"formId":0x0002440b,"name":"The Rear Guard","skill":"Light Armor"},
    {"formId":0x0002440e,"name":"The Refugees","skill":"Light Armor"},
    {"formId":0x0002440f,"name":"Rislav The Righteous","skill":"Light Armor"},
    {"formId":0x00024531,"name":"The Black Arrow, v 2","skill":"Marksman"},
    {"formId":0x00024411,"name":"A Dance in Fire, v5","skill":"Marksman"},
    {"formId":0x00024530,"name":"Father Of The Niben","skill":"Marksman"},
    {"formId":0x00024410,"name":"The Gold Ribbon of Merit","skill":"Marksman"},
    {"formId":0x0002452f,"name":"Vernaccus and Bourlor","skill":"Marksman"},
    {"formId":0x00024534,"name":"2920, Sun's Height (v7)","skill":"Mercantile"},
    {"formId":0x00024532,"name":"The Buying Game","skill":"Mercantile"},
    {"formId":0x00024535,"name":"A Dance in Fire, v6","skill":"Mercantile"},
    {"formId":0x00024536,"name":"A Dance in Fire, v 7","skill":"Mercantile"},
    {"formId":0x00024533,"name":"The Wolf Queen, v 4","skill":"Mercantile"},
    {"formId":0x00024538,"name":"2920, Sun's Dawn (v2)","skill":"Mysticism"},
    {"formId":0x00073a63,"name":"Before the Ages of Man","skill":"Mysticism"},
    {"formId":0x00024539,"name":"The Black Arts On Trial","skill":"Mysticism"},
    {"formId":0x00024537,"name":"The Firsthold Revolt","skill":"Mysticism"},
    {"formId":0x00022b07,"name":"Mythic Dawn Commentaries 4","skill":"Mysticism"},
    {"formId":0x00073a6b,"name":"Souls, Black and White","skill":"Mysticism"},
    {"formId":0x0002453f,"name":"2920, Rain's Hand (v4)","skill":"Restoration"},
    {"formId":0x0002453e,"name":"The Exodus","skill":"Restoration"},
    {"formId":0x00024540,"name":"Mystery of Talara, v 2","skill":"Restoration"},
    {"formId":0x0002453d,"name":"Notes on Racial Phylogeny","skill":"Restoration"},
    {"formId":0x0002453c,"name":"Withershins","skill":"Restoration"},
    {"formId":0x00073a65,"name":"Advances in Lock Picking","skill":"Security"},
    {"formId":0x00024541,"name":"The Locked Room","skill":"Security"},
    {"formId":0x00073a64,"name":"Proper Lock Design","skill":"Security"},
    {"formId":0x00024545,"name":"Surfeit of Thieves","skill":"Security"},
    {"formId":0x00024542,"name":"The Wolf Queen, v 1","skill":"Security"},
    {"formId":0x00024547,"name":"2920, Last Seed (v8)","skill":"Sneak"},
    {"formId":0x00024549,"name":"Legend of Krately House","skill":"Sneak"},
    {"formId":0x0002454a,"name":"Purloined Shadows","skill":"Sneak"},
    {"formId":0x00024548,"name":"Sacred Witness","skill":"Sneak"},
    {"formId":0x00024546,"name":"The Wolf Queen, v 6","skill":"Sneak"},
    {"formId":0x0002454d,"name":"2920, Second Seed (v5)","skill":"Speechcraft"},
    {"formId":0x0002454b,"name":"Biography of the Wolf Queen","skill":"Speechcraft"},
    {"formId":0x0002454c,"name":"The Wolf Queen, v 5","skill":"Speechcraft"},
    {"formId":0x0002454e,"name":"The Wolf Queen, v 7","skill":"Speechcraft"},
    {"formId":0x000243cd,"name":"The Black Arrow, v 1","skill":"Acrobatics"},
];

const houses = [
    {"formId":0x0003636F,"city":'Anvil'},
    {"formId":0x00085480,"city":'Bravil'},
    {"formId":0x00085481,"city":'Bruma'},
    {"formId":0x00085483,"city":'Cheydinhal'},
    {"formId":0x00085482,"city":'Chorrol'},
    {"formId":0x00085485,"city":'Imperial City'},
    {"formId":0x0008547F,"city":'Leyawiin'},
    {"formId":0x00085484,"city":'Skringrad'},
];

// This is just the quest IDs to map to that table
const artifacts = [
    {id:'DAAzura',name:'Azura'},
    {id:'DABoethia',name:'Boethia'},
    {id:'DAClavicusVile',name:'Clavicus Vile'},
    {id:'DAHermaeusMora',name:'Hermaeus Mora'},
    {id:'DAHircine',name:'Hircine'},
    {id:'DAMalacath',name:'Malacath'},
    {id:'DAMephala',name:'Mephala'},
    {id:'DAMeridia',name:'Meridia'},
    {id:'DAMolagBal',name:'Molag Bal'},
    {id:'DANamira',name:'Namira'},
    {id:'DANocturnal',name:'Nocturnal'},
    {id:'DAPeryite',name:'Peryite'},
    {id:'DASanguine',name:'Sanguine'},
    {id:'DASheogorath',name:'Sheogorath'},
    {id:'DAVaermina',name:'Vaermina'},
];

const nirnroots = [
    {"formId":0x0006deba,"x":-223623.9531,"y":-12376.31445,"z":73.03217316,"cell":"Outdoors"},
    {"formId":0x0006f136,"x":-219316.9531,"y":-16615.5957,"z":87.9577713,"cell":"Outdoors"},
    {"formId":0x0006f131,"x":-218724.7188,"y":-2261.121826,"z":184.8167267,"cell":"Outdoors"},
    {"formId":0x0006dec1,"x":-216557.8125,"y":13207.97754,"z":112.4114685,"cell":"Outdoors"},
    {"formId":0x0006deb7,"x":-212850.625,"y":-18107.73047,"z":156.4915161,"cell":"Outdoors"},
    {"formId":0x0006f138,"x":-212687.8125,"y":-36058.19531,"z":67.75214386,"cell":"Outdoors"},
    {"formId":0x0006f0bc,"x":-212294.2344,"y":-26140.78125,"z":69.81809235,"cell":"Outdoors"},
    {"formId":0x0006deb0,"x":-211194.4531,"y":-36905.53516,"z":71.81489563,"cell":"Outdoors"},
    {"formId":0x0006f0b5,"x":-201405.75,"y":-34800.66406,"z":215.4414978,"cell":"Outdoors"},
    {"formId":0x0006f22b,"x":-200081.3438,"y":-32835.39453,"z":26.37973022,"cell":"Outdoors"},
    {"formId":0x0006f13a,"x":-196422.1094,"y":-40794.92578,"z":53.52425766,"cell":"Outdoors"},
    {"formId":0x0006f229,"x":-196298.9688,"y":-33122.91406,"z":24.72749329,"cell":"Outdoors"},
    {"formId":0x0006f13c,"x":-186858.7813,"y":-44950.00391,"z":92.81819916,"cell":"Outdoors"},
    {"formId":0x0006f225,"x":-185768.0313,"y":-28506.92578,"z":140.0505981,"cell":"Outdoors"},
    {"formId":0x0006f227,"x":-185136.5156,"y":-35264.04297,"z":495.4216919,"cell":"Outdoors"},
    {"formId":0x0006f13e,"x":-183493.2188,"y":-54001.05859,"z":211.9946747,"cell":"Outdoors"},
    {"formId":0x0006f143,"x":-167955.6094,"y":-55292.25781,"z":289.5493469,"cell":"Outdoors"},
    {"formId":0x0006dea6,"x":-159377.4375,"y":-55701.34375,"z":180.4580383,"cell":"Outdoors"},
    {"formId":0x0006bce4,"x":-141240.0938,"y":45531.74219,"z":15006.3457,"cell":"Outdoors"},
    {"formId":0x000be2a9,"x":-124333.4141,"y":-1229.318359,"z":7235.830566,"cell":"Outdoors"},
    {"formId":0x0006bce2,"x":-121681.6719,"y":14846.6709,"z":6239.412598,"cell":"Outdoors"},
    {"formId":0x000be2ab,"x":-105844.4063,"y":11159.05371,"z":6607.969238,"cell":"Outdoors"},
    {"formId":0x00070857,"x":-104056.0156,"y":9518.996094,"z":6634.368652,"cell":"Outdoors"},
    {"formId":0x0006bcdf,"x":-103531.3203,"y":105983.7656,"z":20104.31836,"cell":"Outdoors"},
    {"formId":0x0006bce7,"x":-89504.10938,"y":92639.51563,"z":15976.8457,"cell":"Outdoors"},
    {"formId":0x0007155b,"x":-81367.23438,"y":15860.71875,"z":6532.48877,"cell":"Outdoors"},
    {"formId":0x0006bce9,"x":-76189.03125,"y":111213.3203,"z":16909.03125,"cell":"Outdoors"},
    {"formId":0x00071559,"x":-71924.14063,"y":13710.29004,"z":6869.924805,"cell":"Outdoors"},
    {"formId":0x00094038,"x":-53136.68359,"y":26063.05859,"z":6509.59082,"cell":"Outdoors"},
    {"formId":0x0009403a,"x":-51679.08203,"y":27026.03711,"z":6508.715332,"cell":"Outdoors"},
    {"formId":0x0009403c,"x":-51528.66016,"y":25565.81055,"z":6519.486816,"cell":"Outdoors"},
    {"formId":0x0006d911,"x":-16621.08984,"y":61710.09766,"z":2383.598633,"cell":"Outdoors"},
    {"formId":0x0006f1af,"x":-8786.918945,"y":72295.10156,"z":24.22769928,"cell":"Outdoors"},
    {"formId":0x0006d947,"x":-4975.880371,"y":49523.28516,"z":320.5033569,"cell":"Outdoors"},
    {"formId":0x0006f1b1,"x":-4756.145508,"y":83570.46875,"z":172.693924,"cell":"Outdoors"},
    {"formId":0x0006d913,"x":-3208.588623,"y":67965.15625,"z":41.72211075,"cell":"Outdoors"},
    {"formId":0x0006f1ab,"x":-1068.913574,"y":39960.5625,"z":1058.310181,"cell":"Outdoors"},
    {"formId":0x0006f1ad,"x":1614.768188,"y":59052.76563,"z":50.99647522,"cell":"Outdoors"},
    {"formId":0x0006d91a,"x":2234.413086,"y":86037.3125,"z":38.9655838,"cell":"Outdoors"},
    {"formId":0x0006c060,"x":2279.87085,"y":133282.0469,"z":24309.91992,"cell":"Outdoors"},
    {"formId":0x0006f1a5,"x":3388.538574,"y":9700.93457,"z":93.52176666,"cell":"Outdoors"},
    {"formId":0x0006d95e,"x":5880.379395,"y":71964.03906,"z":123.4252319,"cell":"Outdoors"},
    {"formId":0x0006d93f,"x":6272.220703,"y":14512.59668,"z":79.82392883,"cell":"Outdoors"},
    {"formId":0x0006d941,"x":7298.432617,"y":22853.97852,"z":64.58122253,"cell":"Outdoors"},
    {"formId":0x0006d980,"x":8448.990234,"y":60688.23828,"z":89.71569061,"cell":"Outdoors"},
    {"formId":0x0006f1a9,"x":8778.552734,"y":35417.51563,"z":31.96733093,"cell":"Outdoors"},
    {"formId":0x0006f1a0,"x":11484.62891,"y":20129.04102,"z":89.05487823,"cell":"Outdoors"},
    {"formId":0x0006d982,"x":14660.85059,"y":86134.69531,"z":30.02282333,"cell":"Outdoors"},
    {"formId":0x0006d949,"x":16223.74805,"y":49212.53906,"z":148.0009155,"cell":"Outdoors"},
    {"formId":0x0006f19c,"x":17391.6875,"y":26568.07813,"z":41.28822708,"cell":"Outdoors"},
    {"formId":0x0006f198,"x":17643.16797,"y":33087.94141,"z":230.0607605,"cell":"Outdoors"},
    {"formId":0x0006f1a7,"x":20479.5,"y":13403.33203,"z":654.9521484,"cell":"Outdoors"},
    {"formId":0x0006f19e,"x":20709.23828,"y":22794.33789,"z":399.3526917,"cell":"Outdoors"},
    {"formId":0x0006f196,"x":23486.2793,"y":43979.96875,"z":78.11105347,"cell":"Outdoors"},
    {"formId":0x0006f1b3,"x":24109.58594,"y":89975.50781,"z":123.3912354,"cell":"Outdoors"},
    {"formId":0x0006d93c,"x":25275.76953,"y":34329.80078,"z":93.19525146,"cell":"Outdoors"},
    {"formId":0x00070f95,"x":30755.30859,"y":59078.625,"z":3454.130615,"cell":"Outdoors"},
    {"formId":0x0006d97e,"x":30990.17188,"y":22938.67188,"z":120.0995026,"cell":"Outdoors"},
    {"formId":0x0006d984,"x":31171.20703,"y":81157.16406,"z":90.62953186,"cell":"Outdoors"},
    {"formId":0x0006f194,"x":33308.54688,"y":9888.941406,"z":3616.950928,"cell":"Outdoors"},
    {"formId":0x0006d93a,"x":34235.71484,"y":12773.74316,"z":3527.462646,"cell":"Outdoors"},
    {"formId":0x0006f1b5,"x":36398.91797,"y":86179.32031,"z":43.65480804,"cell":"Outdoors"},
    {"formId":0x0006d97c,"x":36445.16406,"y":38962.95313,"z":168.7225342,"cell":"Outdoors"},
    {"formId":0x0006f192,"x":36794.42969,"y":18016.07422,"z":284.3490295,"cell":"Outdoors"},
    {"formId":0x0006d91f,"x":37970.42188,"y":96125.64844,"z":37.91161346,"cell":"Outdoors"},
    {"formId":0x0006f190,"x":39227.85156,"y":28973.46289,"z":271.7076721,"cell":"Outdoors"},
    {"formId":0x0006d95c,"x":43060.10156,"y":74234.41406,"z":58.75416565,"cell":"Outdoors"},
    {"formId":0x0006f106,"x":43393.85156,"y":-35425.39063,"z":71.13097382,"cell":"Outdoors"},
    {"formId":0x0006d94b,"x":44251.19141,"y":36021.94531,"z":32.90920258,"cell":"Outdoors"},
    {"formId":0x0006d95a,"x":44625.86328,"y":41987.65625,"z":245.5461121,"cell":"Outdoors"},
    {"formId":0x0006f1b8,"x":46547.16406,"y":79486.39844,"z":36.79423904,"cell":"Outdoors"},
    {"formId":0x0006f18e,"x":48315.80859,"y":25018.80859,"z":251.151001,"cell":"Outdoors"},
    {"formId":0x0006f182,"x":48425.09375,"y":94541.58594,"z":19.08268738,"cell":"Outdoors"},
    {"formId":0x0006f1bb,"x":52408.22266,"y":66974.45313,"z":118.3814774,"cell":"Outdoors"},
    {"formId":0x0006f184,"x":53306.79688,"y":91007.97656,"z":82.94180298,"cell":"Outdoors"},
    {"formId":0x0006f18c,"x":53794.33203,"y":25469.33789,"z":53.39275742,"cell":"Outdoors"},
    {"formId":0x0006d97a,"x":54690.64063,"y":72480.48438,"z":53.71873856,"cell":"Outdoors"},
    {"formId":0x0006f103,"x":56820.70313,"y":-31631.42188,"z":51.78110123,"cell":"Outdoors"},
    {"formId":0x0006f2eb,"x":56824.80078,"y":44253.72266,"z":26.64395905,"cell":"Outdoors"},
    {"formId":0x0006d988,"x":58161.65234,"y":17484.19141,"z":288.2945557,"cell":"Outdoors"},
    {"formId":0x0006f18a,"x":58276.23047,"y":46023.76953,"z":222.4838257,"cell":"Outdoors"},
    {"formId":0x00005558,"x":58929.4375,"y":-35886.89453,"z":335,"cell":"Outdoors"},
    {"formId":0x0006f2ed,"x":59674.39063,"y":34316.73047,"z":118.6795197,"cell":"Outdoors"},
    {"formId":0x0006d925,"x":59858.01563,"y":30489.8418,"z":584.784729,"cell":"Outdoors"},
    {"formId":0x00005556,"x":60622.39453,"y":-44930.42578,"z":85.31442261,"cell":"Outdoors"},
    {"formId":0x0006f2ce,"x":60754.83594,"y":-31459.06836,"z":97.23623657,"cell":"Outdoors"},
    {"formId":0x0006f186,"x":61157.51563,"y":63727.49609,"z":225.8578796,"cell":"Outdoors"},
    {"formId":0x0006dc42,"x":61179.78125,"y":-37305.30859,"z":479.9412231,"cell":"Outdoors"},
    {"formId":0x0006f188,"x":62114.48047,"y":57984.35547,"z":464.8238525,"cell":"Outdoors"},
    {"formId":0x0006d923,"x":62333.48047,"y":51256.12109,"z":137.1209564,"cell":"Outdoors"},
    {"formId":0x0006dc44,"x":64984.52734,"y":-40379.5,"z":559.7116699,"cell":"Outdoors"},
    {"formId":0x0006d94f,"x":65543.85938,"y":5692.186523,"z":154.3573303,"cell":"Outdoors"},
    {"formId":0x0006f2e7,"x":66575.41406,"y":22380.58008,"z":68.3134613,"cell":"Outdoors"},
    {"formId":0x0006dc46,"x":66862.98438,"y":-39550.10156,"z":714.1365967,"cell":"Outdoors"},
    {"formId":0x0006f2e9,"x":69282.13281,"y":17181.36133,"z":153.2841339,"cell":"Outdoors"},
    {"formId":0x0006f2d2,"x":72374.58594,"y":-13085.22363,"z":108.163681,"cell":"Outdoors"},
    {"formId":0x0006f2d7,"x":72802.41406,"y":-7854.380859,"z":41.9009819,"cell":"Outdoors"},
    {"formId":0x0006f2d0,"x":73133.70313,"y":-22879.28125,"z":182.4388123,"cell":"Outdoors"},
    {"formId":0x0006f114,"x":74114.24219,"y":-44654.50391,"z":549.0261841,"cell":"Outdoors"},
    {"formId":0x0006d98a,"x":74464.47656,"y":-30904.21289,"z":114.8456268,"cell":"Outdoors"},
    {"formId":0x0006d94d,"x":75010.57031,"y":13889.76367,"z":24.86976433,"cell":"Outdoors"},
    {"formId":0x0006f2cc,"x":75832.6875,"y":-51359.18359,"z":149.7617188,"cell":"Outdoors"},
    {"formId":0x0006f125,"x":78113.22656,"y":-67025.76563,"z":112.2147369,"cell":"Outdoors"},
    {"formId":0x0006d936,"x":78974.82031,"y":74865.08594,"z":4641.587891,"cell":"Outdoors"},
    {"formId":0x0006f2de,"x":79157.03906,"y":3242.624268,"z":37.76588058,"cell":"Outdoors"},
    {"formId":0x0006f1e8,"x":81206.09375,"y":-115493.7813,"z":95.77783966,"cell":"Outdoors"},
    {"formId":0x0006f2e0,"x":81970.14063,"y":-1381.593384,"z":33.31191635,"cell":"Outdoors"},
    {"formId":0x0006f11b,"x":82667.34375,"y":-52794.50781,"z":34.71055603,"cell":"Outdoors"},
    {"formId":0x0006b3a7,"x":82889.42188,"y":-166067.7656,"z":151.485199,"cell":"Outdoors"},
    {"formId":0x0006b3af,"x":83074.26563,"y":-122458.2188,"z":11.7148571,"cell":"Outdoors"},
    {"formId":0x0006f2c2,"x":83385.63281,"y":-72067.34375,"z":222.053009,"cell":"Outdoors"},
    {"formId":0x0006f2c4,"x":84454.79688,"y":-67926.82813,"z":273.9793396,"cell":"Outdoors"},
    {"formId":0x0006b3bd,"x":84482.64844,"y":-111427.0859,"z":111.6623459,"cell":"Outdoors"},
    {"formId":0x0006f1e6,"x":84850.78125,"y":-127474.6953,"z":23.00630569,"cell":"Outdoors"},
    {"formId":0x0006f2b6,"x":84859.10938,"y":-100911.3125,"z":138.0979919,"cell":"Outdoors"},
    {"formId":0x0006f121,"x":84985.08594,"y":-45458.05469,"z":72.63877869,"cell":"Outdoors"},
    {"formId":0x0006f2ac,"x":85131.01563,"y":-162458.0625,"z":256.7055969,"cell":"Outdoors"},
    {"formId":0x0006de1b,"x":86589.38281,"y":-75509.42188,"z":19.12232208,"cell":"Outdoors"},
    {"formId":0x0006f2ca,"x":87454.78125,"y":-49981.96875,"z":180.2421112,"cell":"Outdoors"},
    {"formId":0x0006b3a8,"x":87750.61719,"y":-160270.2969,"z":91.10168457,"cell":"Outdoors"},
    {"formId":0x0006f1ef,"x":88135.73438,"y":-94423.76563,"z":53.6774292,"cell":"Outdoors"},
    {"formId":0x0006f2ae,"x":88247.44531,"y":-150184.1406,"z":51.38652802,"cell":"Outdoors"},
    {"formId":0x0006f130,"x":88432.92188,"y":-100942.5859,"z":146.3030396,"cell":"Outdoors"},
    {"formId":0x0006f2b8,"x":89324.16406,"y":-99343.67188,"z":182.9613037,"cell":"Outdoors"},
    {"formId":0x0006b3ad,"x":89820.88281,"y":-132291.375,"z":48.36964035,"cell":"Outdoors"},
    {"formId":0x0006d986,"x":90082.08594,"y":92283.32813,"z":5222.370117,"cell":"Outdoors"},
    {"formId":0x0006f2ba,"x":90791.16406,"y":-89753.53906,"z":158.849823,"cell":"Outdoors"},
    {"formId":0x0006f1f3,"x":91090.8125,"y":-80220.9375,"z":326.3372803,"cell":"Outdoors"},
    {"formId":0x0006f2c6,"x":91454.40625,"y":-68895.38281,"z":232.4066162,"cell":"Outdoors"},
    {"formId":0x0006d938,"x":91540.66406,"y":89722.49219,"z":5236.619141,"cell":"Outdoors"},
    {"formId":0x0006b3a9,"x":91718.66406,"y":-149481.9375,"z":50.06149292,"cell":"Outdoors"},
    {"formId":0x0006f1e2,"x":91837.33594,"y":-126871.4766,"z":285.0136414,"cell":"Outdoors"},
    {"formId":0x0006f2e5,"x":91907.60938,"y":-5278.085938,"z":21.83267021,"cell":"Outdoors"},
    {"formId":0x0006dc38,"x":92162.38281,"y":-138017.75,"z":194.8364716,"cell":"Outdoors"},
    {"formId":0x0006b3b1,"x":92545.34375,"y":-51450.47266,"z":66.75469971,"cell":"Outdoors"},
    {"formId":0x0006f1e4,"x":92601.61719,"y":-137243.5469,"z":70.39744568,"cell":"Outdoors"},
    {"formId":0x0006f1ec,"x":92661.59375,"y":-99495.66406,"z":96.45045471,"cell":"Outdoors"},
    {"formId":0x0006b3be,"x":93539.27344,"y":-108759.1797,"z":64.72759247,"cell":"Outdoors"},
    {"formId":0x0006b3bf,"x":93815.83594,"y":-95841.0625,"z":123.4541931,"cell":"Outdoors"},
    {"formId":0x0006b3ae,"x":93933.48438,"y":-128689.0625,"z":15.76975536,"cell":"Outdoors"},
    {"formId":0x0006dc36,"x":94558.55469,"y":-142224.1719,"z":38.46307373,"cell":"Outdoors"},
    {"formId":0x0006f2b4,"x":94788.10938,"y":-137642.4688,"z":40.2874794,"cell":"Outdoors"},
    {"formId":0x0006dc33,"x":95001.33594,"y":-144504.9531,"z":93.87365723,"cell":"Outdoors"},
    {"formId":0x0006f2b0,"x":95687.90625,"y":-146017.5938,"z":93.83175659,"cell":"Outdoors"},
    {"formId":0x0006f12c,"x":95880.98438,"y":-88607.39063,"z":148.2937927,"cell":"Outdoors"},
    {"formId":0x0006e498,"x":96163.14063,"y":-8333.359375,"z":87.37494659,"cell":"Outdoors"},
    {"formId":0x0006f1f1,"x":96432.91406,"y":-85138.16406,"z":141.4075623,"cell":"Outdoors"},
    {"formId":0x0006f2c0,"x":96839.52344,"y":-70433.17969,"z":55.98289108,"cell":"Outdoors"},
    {"formId":0x0006f1ea,"x":97204.69531,"y":-113452.3125,"z":184.0802917,"cell":"Outdoors"},
    {"formId":0x0006b3aa,"x":97230.49219,"y":-146905.75,"z":91.24338531,"cell":"Outdoors"},
    {"formId":0x0006dc3a,"x":97974.35938,"y":-136010.2344,"z":80.4875946,"cell":"Outdoors"},
    {"formId":0x0006f1e0,"x":98227.22656,"y":-126825.375,"z":140.3743591,"cell":"Outdoors"},
    {"formId":0x0006b3a6,"x":99412.46875,"y":-163543.7031,"z":204.506134,"cell":"Outdoors"},
    {"formId":0x0006f2c8,"x":99512.98438,"y":-57766.32031,"z":288.4924316,"cell":"Outdoors"},
    {"formId":0x0006f2b2,"x":99855.74219,"y":-143529.4063,"z":91.64268494,"cell":"Outdoors"},
    {"formId":0x0006f2bc,"x":100129.3516,"y":-85932.60938,"z":300.673584,"cell":"Outdoors"},
    {"formId":0x0006b3ac,"x":100312.2891,"y":-139042.625,"z":52.03142166,"cell":"Outdoors"},
    {"formId":0x0006d934,"x":100323.5625,"y":66009.32813,"z":826.8410645,"cell":"Outdoors"},
    {"formId":0x0006f1f7,"x":100387.5859,"y":-66619.82813,"z":319.500061,"cell":"Outdoors"},
    {"formId":0x0006f2be,"x":100792.7344,"y":-75859.53906,"z":83.95876312,"cell":"Outdoors"},
    {"formId":0x0006b3ab,"x":101324.7031,"y":-143286.2188,"z":39.7898674,"cell":"Outdoors"},
    {"formId":0x0006b3b2,"x":103046.25,"y":-61872.04688,"z":91.77295685,"cell":"Outdoors"},
    {"formId":0x0006b3b7,"x":103778.8125,"y":-171782.5938,"z":170.2253418,"cell":"Outdoors"},
    {"formId":0x0006f1f5,"x":104438.0625,"y":-74267.40625,"z":41.64804077,"cell":"Outdoors"},
    {"formId":0x0006b3b3,"x":106947.8906,"y":-72389.17969,"z":47.2713356,"cell":"Outdoors"},
    {"formId":0x0006b3bc,"x":109181.3984,"y":-102714.5859,"z":3073.785645,"cell":"Outdoors"},
    {"formId":0x0006f2aa,"x":109366.5234,"y":-171522.1875,"z":1663.142944,"cell":"Outdoors"},
    {"formId":0x0006e4d5,"x":112242.2422,"y":-25790.70898,"z":683.3295898,"cell":"Outdoors"},
    {"formId":0x0006e4a4,"x":112550.2656,"y":15771.14258,"z":235.242157,"cell":"Outdoors"},
    {"formId":0x0006f214,"x":113109.5469,"y":-18911.81836,"z":1155.540283,"cell":"Outdoors"},
    {"formId":0x0006e4b9,"x":113141.0938,"y":54593.78516,"z":934.5090332,"cell":"Outdoors"},
    {"formId":0x0006f1f9,"x":113943.9453,"y":-57155.39844,"z":579.4718628,"cell":"Outdoors"},
    {"formId":0x0006b39b,"x":114950.4141,"y":-127087.4141,"z":3032.363525,"cell":"Outdoors"},
    {"formId":0x0006b39a,"x":116053.2891,"y":-119585.1016,"z":2999.021973,"cell":"Outdoors"},
    {"formId":0x0006e4b2,"x":116151.4297,"y":34525.46875,"z":423.2139587,"cell":"Outdoors"},
    {"formId":0x0006f149,"x":116574.6094,"y":-60885.1875,"z":86.99158478,"cell":"Outdoors"},
    {"formId":0x0006b3b6,"x":116916.3281,"y":-177532.8125,"z":58.66876221,"cell":"Outdoors"},
    {"formId":0x0006f1d0,"x":117236.3594,"y":-115692.875,"z":3064.845215,"cell":"Outdoors"},
    {"formId":0x0006b3bb,"x":118073.3906,"y":-111869.5391,"z":3037.556885,"cell":"Outdoors"},
    {"formId":0x0006f2a8,"x":118904.1094,"y":-182407.5469,"z":148.9563446,"cell":"Outdoors"},
    {"formId":0x0006b39c,"x":119270.375,"y":-122753.2734,"z":3143.659424,"cell":"Outdoors"},
    {"formId":0x0006f0fd,"x":119440.1172,"y":85469.60156,"z":7101.382324,"cell":"Outdoors"},
    {"formId":0x0006f1bd,"x":120443.0078,"y":-120360.5469,"z":3044.899658,"cell":"Outdoors"},
    {"formId":0x0006f2a6,"x":120770.1016,"y":-181911.4063,"z":326.6859131,"cell":"Outdoors"},
    {"formId":0x0006f14d,"x":121000.4922,"y":-45928.30078,"z":66.5987854,"cell":"Outdoors"},
    {"formId":0x0006f0e4,"x":121030.5156,"y":87946.33594,"z":7023.139648,"cell":"Outdoors"},
    {"formId":0x0006f1c0,"x":121343.1641,"y":-127298.625,"z":3156.744873,"cell":"Outdoors"},
    {"formId":0x0006c911,"x":121890.7344,"y":97829.24219,"z":7024.60498,"cell":"Outdoors"},
    {"formId":0x0006b399,"x":122052.8438,"y":-115578.0703,"z":3017.462646,"cell":"Outdoors"},
    {"formId":0x0006f1d2,"x":122131.9375,"y":-120246.9531,"z":3131.37793,"cell":"Outdoors"},
    {"formId":0x0006b3ba,"x":122220.1484,"y":-110866.0234,"z":3006.356689,"cell":"Outdoors"},
    {"formId":0x0006f200,"x":123692.1016,"y":-62670.40234,"z":548.5717773,"cell":"Outdoors"},
    {"formId":0x0006f1fb,"x":124302.6328,"y":-44156.60938,"z":1249.76416,"cell":"Outdoors"},
    {"formId":0x0006f216,"x":124735.4141,"y":-23997.32422,"z":1031.619385,"cell":"Outdoors"},
    {"formId":0x0006f1c6,"x":124917.9219,"y":-106063.4297,"z":3061.057617,"cell":"Outdoors"},
    {"formId":0x0006f1c2,"x":125418.8906,"y":-119476.1484,"z":3053.344238,"cell":"Outdoors"},
    {"formId":0x0006f1de,"x":125449.6797,"y":-128000.3828,"z":3952.335449,"cell":"Outdoors"},
    {"formId":0x0006f202,"x":125649.9766,"y":-71328.21094,"z":867.8811646,"cell":"Outdoors"},
    {"formId":0x0006f1c4,"x":126360.0703,"y":-113892.7109,"z":3081.715332,"cell":"Outdoors"},
    {"formId":0x0006e4b4,"x":126416.6094,"y":35176.31641,"z":162.2823029,"cell":"Outdoors"},
    {"formId":0x0006f1c8,"x":126813.625,"y":-103272.0547,"z":3048.606934,"cell":"Outdoors"},
    {"formId":0x0006f1ce,"x":127060.4766,"y":-117444.2656,"z":3121.58667,"cell":"Outdoors"},
    {"formId":0x0006b39d,"x":127262.5469,"y":-121131.4453,"z":3028.253174,"cell":"Outdoors"},
    {"formId":0x0006b3b5,"x":127529.1641,"y":-174249.1406,"z":31.72787476,"cell":"Outdoors"},
    {"formId":0x0006f151,"x":127775.0078,"y":-56476.55078,"z":145.993927,"cell":"Outdoors"},
    {"formId":0x0006e4d7,"x":128411.25,"y":-23308.14453,"z":147.5176544,"cell":"Outdoors"},
    {"formId":0x0006b3b4,"x":128612.6719,"y":-181285.5,"z":137.4641266,"cell":"Outdoors"},
    {"formId":0x0006f1dc,"x":129280.8906,"y":-122176.3828,"z":3574.67041,"cell":"Outdoors"},
    {"formId":0x0006f154,"x":129493.875,"y":-64770.05078,"z":433.2033691,"cell":"Outdoors"},
    {"formId":0x0006e4d0,"x":129540.0547,"y":74039.5625,"z":122.9941864,"cell":"Outdoors"},
    {"formId":0x0006b3b9,"x":129652.5156,"y":-107461.3203,"z":3022.738525,"cell":"Outdoors"},
    {"formId":0x0006b3b8,"x":129975.9844,"y":-114874.3047,"z":3017.746338,"cell":"Outdoors"},
    {"formId":0x0006f2a4,"x":130556.9688,"y":-178997.6094,"z":157.8711395,"cell":"Outdoors"},
    {"formId":0x0006e4bb,"x":131330.0469,"y":66290.00781,"z":116.153595,"cell":"Outdoors"},
    {"formId":0x0006f218,"x":131703.1719,"y":-22291.02734,"z":35.960289,"cell":"Outdoors"},
    {"formId":0x0006f1cc,"x":132577.8281,"y":-115379.6484,"z":3032.196777,"cell":"Outdoors"},
    {"formId":0x0006b398,"x":132700.125,"y":-109582.9219,"z":3042.80957,"cell":"Outdoors"},
    {"formId":0x0006b397,"x":132766.0156,"y":-102364.0547,"z":3030.461426,"cell":"Outdoors"},
    {"formId":0x0006f158,"x":135098.75,"y":-71309.63281,"z":53.3815155,"cell":"Outdoors"},
    {"formId":0x0006b39e,"x":135411.0469,"y":-117876.9844,"z":3025.120117,"cell":"Outdoors"},
    {"formId":0x0006f1ca,"x":136153.25,"y":-106173.0469,"z":3023.929688,"cell":"Outdoors"},
    {"formId":0x0006b39f,"x":137109.8594,"y":-114736.5391,"z":3033.276367,"cell":"Outdoors"},
    {"formId":0x0006f15f,"x":137919.7188,"y":-66212.84375,"z":104.2876282,"cell":"Outdoors"},
    {"formId":0x0006f1da,"x":138970.3906,"y":-90553.75,"z":3333.587891,"cell":"Outdoors"},
    {"formId":0x0006b3a5,"x":139401.2656,"y":-95055.78125,"z":3045.462891,"cell":"Outdoors"},
    {"formId":0x0006f1d6,"x":139873.0313,"y":-100169.2734,"z":3064.181152,"cell":"Outdoors"},
    {"formId":0x0006f1d4,"x":140144.9063,"y":-111558.7969,"z":3599.912354,"cell":"Outdoors"},
    {"formId":0x0006f204,"x":140598.8125,"y":-77601.78906,"z":1050.272461,"cell":"Outdoors"},
    {"formId":0x0006f162,"x":140870.6563,"y":-57471.03906,"z":136.9282532,"cell":"Outdoors"},
    {"formId":0x0006b3a0,"x":140949.375,"y":-107888.7656,"z":3150.070313,"cell":"Outdoors"},
    {"formId":0x0006e4da,"x":142835.2344,"y":-25231.23438,"z":75.87807465,"cell":"Outdoors"},
    {"formId":0x0006f208,"x":143660.25,"y":-72521.14844,"z":1047.98877,"cell":"Outdoors"},
    {"formId":0x0006e536,"x":143707.9063,"y":-1173.007813,"z":2132.861572,"cell":"Outdoors"},
    {"formId":0x0006b3a2,"x":144119.2813,"y":-101384.3516,"z":3034.425781,"cell":"Outdoors"},
    {"formId":0x0006b3a4,"x":144987.5313,"y":-95148.42188,"z":3094.574219,"cell":"Outdoors"},
    {"formId":0x0006f206,"x":147028.6875,"y":-83903.36719,"z":1535.289673,"cell":"Outdoors"},
    {"formId":0x0006b3a3,"x":147963.875,"y":-98698.96875,"z":3035.054443,"cell":"Outdoors"},
    {"formId":0x0006f1d8,"x":148913.7031,"y":-96889.60156,"z":3141.24292,"cell":"Outdoors"},
    {"formId":0x0006b3a1,"x":149024.2031,"y":-104824.5625,"z":3042.413574,"cell":"Outdoors"},
    {"formId":0x0006f21a,"x":149420.8281,"y":-19390.9375,"z":261.8653564,"cell":"Outdoors"},
    {"formId":0x0006f164,"x":150839.4219,"y":-60016.37109,"z":228.6792297,"cell":"Outdoors"},
    {"formId":0x0006f220,"x":151277.3906,"y":-2966.214111,"z":62.26161194,"cell":"Outdoors"},
    {"formId":0x0006f15c,"x":151487.6563,"y":-81970.5,"z":351.0996704,"cell":"Outdoors"},
    {"formId":0x0006f16e,"x":151556.2188,"y":-44357.79297,"z":860.8694458,"cell":"Outdoors"},
    {"formId":0x0006f169,"x":154143.875,"y":-57630.02734,"z":114.9770737,"cell":"Outdoors"},
    {"formId":0x0006e534,"x":156448.6094,"y":-2718.009766,"z":727.8181152,"cell":"Outdoors"},
    {"formId":0x0006f21e,"x":157290.2344,"y":-5402.916504,"z":86.15033722,"cell":"Outdoors"},
    {"formId":0x0006e538,"x":157588.4844,"y":6664.401855,"z":221.6875153,"cell":"Outdoors"},
    {"formId":0x0006f223,"x":158513.4844,"y":2936.266113,"z":19.6749649,"cell":"Outdoors"},
    {"formId":0x0006f173,"x":159820.875,"y":-50430.3125,"z":1008.478882,"cell":"Outdoors"},
    {"formId":0x0006f20a,"x":160253.7656,"y":-60931.18359,"z":1294.943359,"cell":"Outdoors"},
    {"formId":0x0006e4e2,"x":161908.5156,"y":-12879.74121,"z":100.2211151,"cell":"Outdoors"},
    {"formId":0x0006f20c,"x":162001.1563,"y":-65995.25781,"z":45.70460892,"cell":"Outdoors"},
    {"formId":0x0006f21c,"x":163545.0469,"y":-11219.58496,"z":813.3042603,"cell":"Outdoors"},
    {"formId":0x0006f178,"x":168695.2656,"y":-64056.30078,"z":24.65862274,"cell":"Outdoors"},
    {"formId":0x0006f20e,"x":171225.7031,"y":-59321.64063,"z":119.9560089,"cell":"Outdoors"},
    {"formId":0x0006f17a,"x":175158.9844,"y":-51643.76953,"z":249.5135803,"cell":"Outdoors"},
    {"formId":0x0006f17e,"x":176356.0313,"y":-20165.70508,"z":732.6709595,"cell":"Outdoors"},
    {"formId":0x0006f210,"x":176464.5781,"y":-60731.82813,"z":310.1280823,"cell":"Outdoors"},
    {"formId":0x0006f17c,"x":177787.7813,"y":-45643.30469,"z":1412.053467,"cell":"Outdoors"},
    {"formId":0x0006de9c,"x":180893.1094,"y":-27057.29297,"z":585.2973633,"cell":"Outdoors"},
    {"formId":0x0006f212,"x":185510.9844,"y":-63424.76953,"z":914.9724121,"cell":"Outdoors"},
    {"formId":0x0006f180,"x":189155.1094,"y":-22257.54492,"z":525.7055054,"cell":"Outdoors"},
    {"formId":0x0006d91d,"x":-256,"y":2461,"z":-49,"cell":"ImperialSewerSystemN01"},
    {"formId":0x0006d946,"x":673,"y":97,"z":-44,"cell":"PellGateShafayesHouse"},
    {"formId":0x0006d952,"x":401,"y":-1994,"z":-740,"cell":"VeyondCave02"},
    {"formId":0x0006d957,"x":61,"y":33,"z":-41,"cell":"ICWaterfrontMarieElenaCaptainsCabin"},
    {"formId":0x0006d963,"x":30,"y":-2,"z":915,"cell":"ICMarketDistrictMysticEmporiumUpstairs"},
    {"formId":0x0006d968,"x":2424,"y":1962,"z":7015,"cell":"ICTalosPlazaSamuelBantiensHouseUpstairs"},
    {"formId":0x0006d96d,"x":2449,"y":2083,"z":7111,"cell":"ICTempleDistrictSalomonGeonettesHouseUpstairs"},
    {"formId":0x0006d973,"x":296,"y":-1162,"z":277,"cell":"ICImperialLegionWatchTowerSCaptainsQuarters"},
    {"formId":0x0006d979,"x":594,"y":-12,"z":-229,"cell":"ICArcaneUniversityArchMagesQuarters"},
    {"formId":0x0006dc3f,"x":-388,"y":-218,"z":337,"cell":"LeyawiinBlackwoodCompanyHall"},
    {"formId":0x0006f0c6,"x":376,"y":266,"z":108,"cell":"AnvilUlfgarFogeyesHouse"},
    {"formId":0x0006f0cb,"x":-444,"y":139,"z":89,"cell":"AnvilHeinrichOakenHallsHouseSecondFloor"},
    {"formId":0x0006f0cf,"x":2636,"y":1775,"z":6205,"cell":"AnvilCastleSmugglersCave"},
    {"formId":0x0006f0d1,"x":-1285,"y":1605,"z":183,"cell":"AnvilCastlePrivateQuarters"},
    {"formId":0x0006f0df,"x":466,"y":-22,"z":-226,"cell":"CheydinhalMachNasBooks"},
    {"formId":0x0006f0ea,"x":1898,"y":1449,"z":-423,"cell":"CheydinhalMagesGuildWell"},
    {"formId":0x0006f0f0,"x":-114,"y":348,"z":65,"cell":"CheydinhalRiverview"},
    {"formId":0x0006f0f5,"x":329,"y":-1363,"z":-118,"cell":"BravilChapelGreatHall"},
    {"formId":0x0006f0fa,"x":4423,"y":4534,"z":-3,"cell":"BravilWizardsGrotto"},
    {"formId":0x0006f22e,"x":406,"y":440,"z":28,"cell":"BorderWatchInn"},
    {"formId":0x0006f234,"x":-109,"y":-405,"z":-145,"cell":"BravilAndragilHouse"},
    {"formId":0x0006f23a,"x":246,"y":17,"z":-65,"cell":"BravilCitySwimmerHouse"},
    {"formId":0x0006f23f,"x":1599,"y":2223,"z":6297,"cell":"BravilFightersGuild2ndFloor"},
    {"formId":0x0006f244,"x":-213,"y":348,"z":82,"cell":"BravilSilverHomeonthewater3rdFloor"},
    {"formId":0x0006f249,"x":297,"y":-74,"z":-181,"cell":"BrindleHome"},
    {"formId":0x0006f24e,"x":-520,"y":-234,"z":146,"cell":"BrumaBaenlinsHouse"},
    {"formId":0x0006f253,"x":-1524,"y":-2013,"z":-16,"cell":"BrumaCastleLordsManor"},
    {"formId":0x0006f258,"x":356,"y":114,"z":-353,"cell":"BrumaRegnersHouse"},
    {"formId":0x0006f25c,"x":147,"y":348,"z":52,"cell":"ChorrolCastaScriboniasHouse"},
    {"formId":0x0006f261,"x":186,"y":292,"z":74,"cell":"ChorrolVilenaDontonsQuarters"},
    {"formId":0x0006f266,"x":157,"y":44,"z":278,"cell":"HackdirtNatchPindersHouse"},
    {"formId":0x0006f26b,"x":317,"y":-60,"z":9,"cell":"ICArcaneUniversityMagesQuarters"},
    {"formId":0x0006f270,"x":375,"y":540,"z":-51,"cell":"ICMarketDistrictTheGildedCarafe"},
    {"formId":0x0006f27a,"x":-2687,"y":-493,"z":83,"cell":"LeyawiinAhdarjisHouse2ndFloorWest"},
    {"formId":0x0006f27f,"x":6,"y":-357,"z":70,"cell":"LeyawiinBlackwoodRoom01"},
    {"formId":0x0006f284,"x":696,"y":-560,"z":71,"cell":"LeyawiinMargartesHouse"},
    {"formId":0x0006f289,"x":467,"y":186,"z":-204,"cell":"LordRugdumphEstate"},
    {"formId":0x0006f28e,"x":2493,"y":2082,"z":7164,"cell":"OdiilFarm"},
    {"formId":0x0006f298,"x":204,"y":-149,"z":-116,"cell":"SkingradSurilieBrothersHouse"},
    {"formId":0x0006f29d,"x":122,"y":-329,"z":-251,"cell":"SkingradToutiusSextiusHouse"},
    {"formId":0x0006f2a0,"x":-2969,"y":-197,"z":-521,"cell":"FortCedrian01"},
    {"formId":0x0006f2a2,"x":-311,"y":4176,"z":-158,"cell":"FortRoebeck01"},
    {"formId":0x0006e4d2,"x":2269,"y":1416,"z":2,"cell":"HuntersRun01"},
];

const arena = [
    {formId:0x00027668,name:'1st fight?',fame:1,ignore:false},
    {formId:0x0001DC4D,name:'2nd fight?',fame:1,ignore:false},
    {formId:0x0001DC4C,name:'3rd fight/brawler promo?',fame:1,ignore:false},
    {formId:0x00025B39,name:'4th fight?',fame:1,ignore:false},
    {formId:0x000164C4,name:'5th fight?',fame:1,ignore:false},
    {formId:0x000164CA,name:'6th fight/bloodletter promo?',fame:1,ignore:false},
    {formId:0x00017690,name:'7th fight/redguard?',fame:1,ignore:false},
    {formId:0x00017696,name:'8th fight/breton?',fame:1,ignore:false},
    {formId:0x0001769C,name:'9th fight/myrmidon promo?',fame:1,ignore:false},
    {formId:0x000176A3,name:'10th fight/wood elf?',fame:1,ignore:false},
    {formId:0x000176A9,name:'11th fight/altmer?',fame:1,ignore:false},
    {formId:0x000176AF,name:'12th fight/orc/warrior promo?',fame:1,ignore:false},
    {formId:0x000176B5,name:'13th fight/nord?',fame:1,ignore:false},
    {formId:0x000176B8,name:'14th fight/high elf?',fame:1,ignore:false},
    {formId:0x00017832,name:'15th fight/orc/gladiator promo?',fame:1,ignore:false},
    {formId:0x0001C0CB,name:'16th fight/yellow team?',fame:1,ignore:false},
    {formId:0x0001C0D1,name:'17th fight/cat?',fame:1,ignore:false},
    {formId:0x0001C0D7,name:'18th fight/hero promo?',fame:1,ignore:false},
    {formId:0x0001C0DD,name:'19th fight/hero?',fame:1,ignore:false},
    {formId:0x000176BE,name:'20th fight/elf?',fame:1,ignore:false},
    {formId:0x000176C4,name:'21st fight/yellow team/champion promo?',fame:1,ignore:false},
    {formId:0x0003B1DD,name:'22nd fight/grand champ promo, heavy raiment?',fame:10,ignore:true},
    {formId:0x0003B1DE,name:'22nd fight/grand champ promo, light raiment?',fame:10,ignore:true},
];

const factions = [
    {formId:0x0001dbcd,name:'Player Faction',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x0002228f,name:'Fighters Guild',maxRankName:'Master',maxRank:9,ignore:false},
    {formId:0x00022296,name:'Mages Guild',maxRankName:'Arch-Mage',maxRank:9,ignore:false},
    {formId:0x00024164,name:'Thieves Guild',maxRankName:'Gray Fox',maxRank:7,ignore:false},
    {formId:0x00026de8,name:'Dark Brotherhood Player Secret Faction',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x000274ab,name:'Blades',maxRankName:'Knight Brother|Knight Sister',maxRank:0,ignore:false},
    {formId:0x000299b9,name:'Arena',maxRankName:'Grand Champion',maxRank:8,ignore:false},
    {formId:0x0002f872,name:'Dark Brotherhood',maxRankName:'Listener',maxRank:7,ignore:false},
    {formId:0x0002ff29,name:'Blackwood Company',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x000335b0,name:'Knights of the Thorn',maxRankName:'Honorary Knight',maxRank:0,ignore:false},
    {formId:0x0003ab39,name:'Imperial City Waterfront Resident',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x0003cd10,name:'Anyone wearing Bands of the Chosen',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x0003cd27,name:'Put the player or anyone hated in this faction',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x0004ce4d,name:'Faction for all friendlies in MQ16',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x000904e3,name:'Dark Brotherhood No Guards Allowed Club',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x000908ab,name:'Mazoga Friend',maxRankName:'',maxRank:0,ignore:true},
    {formId:0x000908c0,name:'Knights of the White Stallion',maxRankName:'Knight-Errant',maxRank:0,ignore:false},
    {formId:0x000980dd,name:'Order of the Virtuous Blood',maxRankName:'Brother|Sister',maxRank:0,ignore:false},
    {formId:0x000add4b,name:'Order of the Dragon',maxRankName:'Champion of Cyrodiil',maxRank:0,ignore:false},
];

const greaterPowers = [
    {formId:0x0006B69E,name:'Jone\'s Shadow'},
    {formId:0x0006B69D,name:'Gates of Aetherius'},
    {formId:0x0006B69F,name:'Jode\'s Blood'},
    {formId:0x0006B6A0,name:'Sithian Web'},
    {formId:0x0006B6A1,name:'Skein of Magnus'},
    {formId:0x0006B6A2,name:'Shield of Shezarr'},
    {formId:0x0006B6A3,name:'Dragon Dream'},
    {formId:0x00014D23,name:'Pilgrim\'s Grace'},
];

// This is really sketchy, just hoping these indexes are always the same between saves
// They might vary depending on if SI DLC is loaded or not???
// Found by changing the values to something unique via console command `set MaraFame to 9001`, etc
const wayshrines = [
    {globalIndex:47,name:'Mara'},
    {globalIndex:48,name:'Stendarr'},
    {globalIndex:49,name:'Arkay'},
    {globalIndex:50,name:'Dibella'},
    {globalIndex:51,name:'Akatosh'},
    {globalIndex:52,name:'Tiber Septim'},
    {globalIndex:53,name:'Zenithar'},
    {globalIndex:54,name:'Kynareth'},
    {globalIndex:55,name:'Julianos'},
];

const incompleteQuests = [
    {id:'TGExpelled',formId:0x0001E868,name:'Cast out of the Thieves Guild',stages:[10,20,30,40],failStages:[],url:'https://en.uesp.net/wiki/Oblivion:Cast_out_of_the_Thieves_Guild'},
    {id:'Dark19Whispers',formId:0x00030064,name:'Whispers of Death',stages:[10],failStages:[],url:'https://en.uesp.net/wiki/Oblivion:Whispers_of_Death'},
    {id:'ArenaDialogue',formId:0x000E0C91,name:'The Arena',stages:[100],failStages:[],url:'https://en.uesp.net/wiki/Oblivion:Arena_(faction)'},
    {id:'FG00Expulsion',formId:0x00025E27,name:'Expelled from the Fighters Guild',stages:[60],failStages:[100],url:'https://en.uesp.net/wiki/Oblivion:Expelled_from_the_Fighters_Guild'},
];

const rebuildQuestsTable = (saveFile = undefined) => {
    let qTable = document.getElementById('quest-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let fame = 0;

    for (const quest of quests) {
        let status = '✖';
        if (saveFile) {
            
            let record = saveFile.records.find((e) => e.formId === quest.formId);
            if (record) {
                for (const stage of record.subRecord.stage) {
                    if (quest.stages.includes(stage.index) && stage.flag&0x1) {
                        status = '✔';
                        ++completed;
                        fame += quest.fame;
                        break;
                    }
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='id'>${quest.id}</td>
<td class='formId'>${('0000000'+quest.formId.toString(16)).substr(-8)}</td>
<td class='name'>${quest.name}</td>
<td class='stages'>${quest.stages.join('<br>')}</td>
<td class='fame'>${quest.fame}</td>
<td class='url'><a href="${quest.url}">UESP</a></td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
    qFoot.querySelector('.total-fame').innerText = fame;
};

const rebuildIncompleteQuestsTable = (saveFile = undefined) => {
    let qTable = document.getElementById('incomplete-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let fame = 0;

    for (const quest of incompleteQuests) {
        let status = '✖';
        if (saveFile) {
            
            let record = saveFile.records.find((e) => e.formId === quest.formId);
            if (record) {
                for (const stage of record.subRecord.stage) {
                    if (quest.stages.includes(stage.index) && stage.flag & 0x1 === 0x1) {
                        status = '✔';
                        break;
                    }
                }
                for (const stage of record.subRecord.stage) {
                    if (quest.failStages.includes(stage.index) && stage.flag & 0x1 === 0x1) {
                        status = '❗';
                        break;
                    }
                }
                if (status === '✔') ++completed;
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='id'>${quest.id}</td>
<td class='formId'>${('0000000'+quest.formId.toString(16)).substr(-8)}</td>
<td class='name'>${quest.name}</td>
<td class='stages'>${quest.stages.join('<br>')}</td>
<td class='failStages'>${quest.failStages.join('<br>')}</td>
<td class='url'><a href="${quest.url}">UESP</a></td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildLocsTable = (saveFile = undefined) => {
    let qTable = document.getElementById('loc-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const loc of locs) {
        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === loc.formId);
            if (record) {
                let prop = record.subRecord.properties.find(p=>p.flag===51);
                if (prop && prop.value===3) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${loc.formId?('0000000'+loc.formId.toString(16)).substr(-8):'???'}</td>
<td class='name'>${loc.name}</td>
<td class='x'>${loc.x??loc.approxX}</td>
<td class='y'>${loc.y??loc.approxY}</td>
<td class='z'>${loc.z??'?'}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};
const rebuildSkillsTable = (saveFile = undefined) => {
    let qTable = document.getElementById('skills-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let record = undefined;
    if (saveFile) {
        record = saveFile.records.find((e) => e.formId===0x7);
    }

    for (const skill of skills) {
        let status = '✖';

        let skillLevel = 0;

        if (record) {
            skillLevel = record.subRecord[skill.key];
            if (skillLevel >= 100) {
                status = '✔';
                ++completed;
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='name'>${skill.name}</td>
<td class='level'>${skillLevel}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};
const rebuildGatesTable = (saveFile = undefined) => {
    let qTable = document.getElementById('gates-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const gate of gates) {
        if (gate.ignore) continue;

        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === gate.formId);
            if (record) {
                if (record.flags & 0x7000005 === 0x7000005) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${gate.formId?('0000000'+gate.formId.toString(16)).substr(-8):'???'}</td>
<td class='name'>${gate.name}</td>
<td class='x'>${gate.x}</td>
<td class='y'>${gate.y}</td>
<td class='z'>${gate.z}</td>
<td class='fixed'>${gate.fixed ? 'Yes' : 'No'}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildHorsesTable = (saveFile = undefined) => {
    let qTable = document.getElementById('horses-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const horse of horses) {
        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === horse.formId);
            if (record) {
                if (record.flags & 0x40000000) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${horse.formId?('0000000'+horse.formId.toString(16)).substr(-8):'???'}</td>
<td class='name'>${horse.name}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildInvestmentsTable = (saveFile = undefined) => {
    let qTable = document.getElementById('investments-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const invest of investments) {
        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === invest.formId);
            if (record) {
                if (record.subRecord?.properties.find(p=>p.flag===82)?.value === 500) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${invest.formId?('0000000'+invest.formId.toString(16)).substr(-8):'???'}</td>
<td class='city'>${invest.city}</td>
<td class='store'>${invest.store}</td>
<td class='name'>${invest.name}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildBooksTable = (saveFile = undefined) => {
    let qTable = document.getElementById('books-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const book of books) {
        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === book.formId);
            if (record) {
                if (record.subRecord?.teaches === 255) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${book.formId?('0000000'+book.formId.toString(16)).substr(-8):'???'}</td>
<td class='skill'>${book.skill}</td>
<td class='name'>${book.name}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildInfo = (saveFile) => {
    const infoDiv = document.querySelector('#info-table .info');
    for (const elem of [...infoDiv.querySelectorAll('.read')]) {
        const key = [...elem.classList].filter(c=>c!=='read')[0];
        const valDiv = elem.querySelector('.value');
        let val = saveFile[key];
        if (val instanceof Date) {
            val = val.toISOString();
        }
        valDiv.innerText = val;
    }
    [...infoDiv.querySelectorAll('.screenshot > *')].forEach(e=>e.remove());
    let canvas = document.createElement('canvas');
    infoDiv.querySelector('.screenshot').append(canvas);
    canvas.width = saveFile.screenshotWidth;
    canvas.height = saveFile.screenshotHeight;
    let ctx = canvas.getContext('2d');
    let data = ctx.getImageData(0,0,canvas.width,canvas.height);
    let ssOffset = 0;
    let cOffset = 0;
    for (; ssOffset < saveFile.screenshotSize; ++ssOffset, ++cOffset) {
        data.data[cOffset] = saveFile.screenshotData[ssOffset];
        if (ssOffset % 3 === 2) {
            ++cOffset;
            data.data[cOffset] = 255;
        }
    }
    ctx.putImageData(data, 0, 0);
};

const rebuildHousesTable = (saveFile = undefined) => {
    let qTable = document.getElementById('houses-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const house of houses) {
        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === house.formId);
            if (record) {
                if (record.subRecord?.stageNum > 0) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${house.formId?('0000000'+house.formId.toString(16)).substr(-8):'???'}</td>
<td class='city'>${house.city}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildArtifactsTable = (saveFile = undefined) => {
    let qTable = document.getElementById('artifacts-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let fame = 0;

    for (const artifact of artifacts) {
        let quest = quests.find(q=>q.id === artifact.id);
        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === quest.formId);
            if (record) {
                for (const stage of record.subRecord.stage) {
                    if (stage.index === 100 && stage.flag&0x1) {
                        status = '✔';
                        ++completed;
                    }
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${('0000000'+quest.formId.toString(16)).substr(-8)}</td>
<td class='name'>${artifact.name}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildNirnrootTable = (saveFile = undefined) => {
    let qTable = document.getElementById('nirnroot-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const root of nirnroots) {
        let status = '✖';
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === root.formId);
            if (record) {
                if (record.flags&0x44000000===0x44000000) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${root.formId?('0000000'+root.formId.toString(16)).substr(-8):'???'}</td>
<td class='x'>${root.x}</td>
<td class='y'>${root.y}</td>
<td class='z'>${root.z}</td>
<td class='cell'>${root.cell}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildArenaTable = (saveFile = undefined) => {
    let qTable = document.getElementById('arena-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let fame = 0;

    for (const fight of arena) {
        let status = '✖';
        if (saveFile) {
            
            let record = saveFile.records.find((e) => e.formId === fight.formId);
            if (record) {
                if (record.subRecord?.topicSaidOnce) {
                    status = '✔';
                    ++completed;
                    fame += fight.fame;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${('0000000'+fight.formId.toString(16)).substr(-8)}</td>
<td class='name'>${fight.name}</td>
<td class='fame'>${fight.fame}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
    qFoot.querySelector('.total-fame').innerText = fame;
};

const rebuildPowersTable = (saveFile = undefined) => {
    let qTable = document.getElementById('powers-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let record = undefined;
    if (saveFile) {
        record = saveFile.records.find((e) => e.formId===0x7);
    }

    for (const power of greaterPowers) {
        let status = '✖';

        if (record) {
            if (record.subRecord.spellIds.map(i=>saveFile.formIds[i]??i).includes(power.formId)) {
                status = '✔';
                ++completed;
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${('0000000'+power.formId.toString(16)).substr(-8)}</td>
<td class='name'>${power.name}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildWayshrinesTable = (saveFile = undefined) => {
    let qTable = document.getElementById('wayshrines-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;

    for (const shrine of wayshrines) {
        let status = '✖';

        let fameLevel = 0;

        if (saveFile) {
            fameLevel = saveFile.globals[shrine.globalIndex]?.value;
            if (fameLevel > 0) {
                status = '✔';
                ++completed;
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='name'>${shrine.name}</td>
<td class='fameLevel'>${fameLevel}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildFameTable = (saveFile = undefined) => {
    let qTable = document.getElementById('fame-table');
    let qBody = qTable.querySelector('tbody');
    let qQuestsRow = qBody.querySelector('tr.quests');
    let qGatesRow = qBody.querySelector('tr.gates');
    let qArenaRow = qBody.querySelector('tr.arena');
    let qTotalRow = qBody.querySelector('tr.total');

    let totalCurrent = 0;
    let totalMax = 0;

    // Quests
    let questsCurrent = 0;
    let questsMax = 0;
    for (const quest of quests) {
        questsMax += quest.fame;
        totalMax += quest.fame;
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === quest.formId);
            if (record) {
                for (const stage of record.subRecord.stage) {
                    if (quest.stages.includes(stage.index) && stage.flag&0x1) {
                        questsCurrent += quest.fame;
                        totalCurrent += quest.fame;
                        break;
                    }
                }
            }
        }
    }

    let questsStatus = questsCurrent === questsMax ? '✔' : '✖';
    qQuestsRow.querySelector('.status').innerText = questsStatus;
    qQuestsRow.querySelector('.current').innerText = questsCurrent;
    qQuestsRow.querySelector('.max').innerText = questsMax;

    // Gates
    let gatesCurrent = 0;
    // +40 for random gates
    let gatesMax = 40;
    totalMax += 40;
    for (const gate of gates) {
        if (gate.fixed) {
            gatesMax += gate.fame;
            totalMax += gate.fame;
        }
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === gate.formId);
            if (record) {
                if (record.flags & 0x7000005 === 0x7000005) {
                    gatesCurrent += gate.fame;
                    totalCurrent += gate.fame;
                }
            }
        }
    }

    let gatesStatus = gatesCurrent === gatesMax ? '✔' : '✖';
    qGatesRow.querySelector('.status').innerText = gatesStatus;
    qGatesRow.querySelector('.current').innerText = gatesCurrent;
    qGatesRow.querySelector('.max').innerText = gatesMax;

    // Arena
    let arenaCurrent = 0;
    // +10 for champion fight
    let arenaMax = 10;
    totalMax += 10;

    for (const fight of arena) {
        if (!fight.ignore) {
            arenaMax += fight.fame;
            totalMax += fight.fame;
        }
        if (saveFile) {
            let record = saveFile.records.find((e) => e.formId === fight.formId);
            if (record) {
                if (record.subRecord?.topicSaidOnce) {
                    arenaCurrent += fight.fame;
                    totalCurrent += fight.fame;
                }
            }
        }
    }

    let arenaStatus = arenaCurrent === arenaMax ? '✔' : '✖';
    qArenaRow.querySelector('.status').innerText = arenaStatus;
    qArenaRow.querySelector('.current').innerText = arenaCurrent;
    qArenaRow.querySelector('.max').innerText = arenaMax;

    // Totals
    let totalStatus = totalCurrent === totalMax ? '✔' : '✖';
    qTotalRow.querySelector('.status').innerText = totalStatus;
    qTotalRow.querySelector('.current').innerText = totalCurrent;
    qTotalRow.querySelector('.max').innerText = totalMax;
};

const rebuildFactionsTable = (saveFile = undefined) => {
    let qTable = document.getElementById('factions-table');
    let qBody = qTable.querySelector('tbody');
    let qFoot = qTable.querySelector('tfoot');

    [...qBody.querySelectorAll('tr')].forEach((e) => {
        e.remove();
    });

    let completed = 0;
    let record = undefined;
    if (saveFile) {
        record = saveFile.records.find((e) => e.formId===0x7);
    }

    for (const faction of factions) {
        if (faction.ignore) continue;
        let status = '✖';
        let rank = 0;
        if (saveFile) {
            if (record) {
                rank = record.subRecord?.factions?.find(f=>saveFile.formIds[f.faction]===faction.formId)?.factionRank;
                if (rank === faction.maxRank) {
                    status = '✔';
                    ++completed;
                }
            }
        }

        let qTr = document.createElement('tr');
        qTr.innerHTML = `
<td class='status ${status}'>${status}</td>
<td class='formId'>${faction.formId?('0000000'+faction.formId.toString(16)).substr(-8):'???'}</td>
<td class='name'>${faction.name}</td>
<td class='maxRankName'>${faction.maxRankName}</td>
<td class='curRank'>${rank}</td>
<td class='maxRank'>${faction.maxRank}</td>
`;
        qBody.append(qTr);
    }

    qFoot.querySelector('.total-completed').innerText = completed;
};

const rebuildStatistics = (saveFile) => {
    const record = saveFile.records.find(r=>r.formId===0x14);
    if (record) {
        const statDiv = document.querySelector('#statistics-table');
        for (const elem of [...statDiv.querySelectorAll('.read')]) {
            const key = [...elem.classList].filter(c=>c!=='read')[0];
            const valDiv = elem.querySelector('.value');
            let val = record.subRecord?.player?.statistics[key];
            if (val === undefined) {
                val = '?';
            }
            if (val instanceof Date) {
                val = val.toISOString();
            }
            valDiv.innerText = val;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    rebuildQuestsTable();
    rebuildLocsTable();
    rebuildSkillsTable();
    rebuildGatesTable();
    rebuildHorsesTable();
    rebuildInvestmentsTable();
    rebuildBooksTable();
    rebuildHousesTable();
    rebuildArtifactsTable();
    rebuildNirnrootTable();
    rebuildArenaTable();
    rebuildFameTable();
    rebuildFactionsTable();
    rebuildPowersTable();
    rebuildWayshrinesTable();
    rebuildIncompleteQuestsTable();
    const ignoreEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    // Handle drag+drop of files. Have to ignore dragenter/dragover for compatibility reasons.
    document.body.addEventListener('dragenter', ignoreEvent);
    document.body.addEventListener('dragover', ignoreEvent);

    /**
     * @param {DragEvent} e 
     */
    const dropHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        if (dt) {
            const files = dt.files;
            for (const file of files)
            void file.arrayBuffer().then((b) => {
                const saveFile = new window.oblivionSaveFile.SaveFile(b);
                console.log(saveFile);
                window.saveFile = saveFile;
                rebuildQuestsTable(saveFile);
                rebuildLocsTable(saveFile);
                rebuildSkillsTable(saveFile);
                rebuildGatesTable(saveFile);
                rebuildHorsesTable(saveFile);
                rebuildInvestmentsTable(saveFile);
                rebuildBooksTable(saveFile);
                rebuildHousesTable(saveFile);
                rebuildArtifactsTable(saveFile);
                rebuildNirnrootTable(saveFile);
                rebuildArenaTable(saveFile);
                rebuildFameTable(saveFile);
                rebuildFactionsTable(saveFile);
                rebuildPowersTable(saveFile);
                rebuildWayshrinesTable(saveFile);
                rebuildIncompleteQuestsTable(saveFile);

                rebuildInfo(saveFile);
                rebuildStatistics(saveFile);
            });
        }
    };

    document.body.addEventListener('drop', dropHandler);
});
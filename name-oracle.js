// name-oracle.js — Base de conocimiento de nombres, apellidos y arquetipos
// Mapa de Vida © 2026 | Motor de lectura onomástica personalizada

window.NameOracle = (function () {
  'use strict';

  // ══════════════════════════════════════════
  // BASE DE DATOS DE NOMBRES (200+ entradas)
  // ══════════════════════════════════════════
  var NAMES_DB = {
    // A
    'abel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Aliento, vapor efímero. El que percibe la fugacidad y sabe que cada instante es sagrado.', element:'Aire', planet:'Luna', archetype:'El Poeta', gem:'Aguamarina', color:'Azul celeste' },
    'abigail': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Alegría del padre. Portadora de luz y festividad en el hogar.', element:'Fuego', planet:'Sol', archetype:'La Celebrante', gem:'Citrino', color:'Amarillo' },
    'ada': { origin:'Hebreo/Germánico', lang:'Germánico antiguo', meaning:'Nobleza. La que lleva la gracia ancestral en su linaje.', element:'Tierra', planet:'Venus', archetype:'La Reina', gem:'Esmeralda', color:'Verde' },
    'adriana': { origin:'Latino', lang:'Latín', meaning:'Proveniente del Mar Adriático. Portadora de la fuerza del océano.', element:'Agua', planet:'Neptuno', archetype:'La Navegante', gem:'Perla', color:'Azul marino' },
    'adrián': { origin:'Latino', lang:'Latín', meaning:'Proveniente del Mar Adriático. Alma profunda con la fuerza y misterio del mar.', element:'Agua', planet:'Neptuno', archetype:'El Explorador', gem:'Zafiro', color:'Azul índigo' },
    'agustín': { origin:'Latino', lang:'Latín', meaning:'El Augusto, el consagrado. Lleva la dignidad de los grandes emperadores romanos.', element:'Fuego', planet:'Sol', archetype:'El Soberano', gem:'Rubí', color:'Dorado' },
    'alejandra': { origin:'Griego', lang:'Griego antiguo', meaning:'Defensora de la humanidad. Guerrera protectora, heredera de Alejandro.', element:'Fuego', planet:'Marte', archetype:'La Guerrera', gem:'Rubí', color:'Rojo' },
    'alejandro': { origin:'Griego', lang:'Griego antiguo', meaning:'Defensor de hombres. El que protege y conquista mundos con valentía y visión.', element:'Fuego', planet:'Marte', archetype:'El Conquistador', gem:'Diamante', color:'Dorado' },
    'alicia': { origin:'Germánico', lang:'Germánico antiguo', meaning:'De noble naturaleza. La que porta la nobleza del espíritu en todas sus formas.', element:'Tierra', planet:'Venus', archetype:'La Aristócrata del Alma', gem:'Esmeralda', color:'Verde esmeralda' },
    'alma': { origin:'Latino', lang:'Latín', meaning:'Alma, espíritu vital. La que nutre y sostiene la vida con su sola presencia.', element:'Éter', planet:'Luna', archetype:'La Nodriza', gem:'Moonstone', color:'Blanco perlado' },
    'álvaro': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El guardián precavido. Combinación de "elf" (elfo) y "guard" (guardia); protector mágico.', element:'Aire', planet:'Mercurio', archetype:'El Centinela', gem:'Topacio', color:'Azul celeste' },
    'amalia': { origin:'Germánico', lang:'Germánico antiguo', meaning:'Trabajo y laboriosidad. La que construye su destino con perseverancia y gracia.', element:'Tierra', planet:'Saturno', archetype:'La Artesana', gem:'Ónix', color:'Ocre' },
    'amanda': { origin:'Latino', lang:'Latín', meaning:'La digna de ser amada. Su vibración atrae el amor en todas sus formas.', element:'Agua', planet:'Venus', archetype:'La Amada', gem:'Rosa cuarzo', color:'Rosa' },
    'amparo': { origin:'Latino', lang:'Latín', meaning:'Protección y refugio. La que ofrece cobijo a los que buscan paz.', element:'Tierra', planet:'Luna', archetype:'La Guardiana', gem:'Turquesa', color:'Verde azulado' },
    'ana': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Gracia divina. Una de las vibraciones más puras y universales del cosmos.', element:'Agua', planet:'Luna', archetype:'La Gracia', gem:'Perla', color:'Blanco' },
    'andrea': { origin:'Griego', lang:'Griego antiguo', meaning:'Valerosa, con espíritu guerrero. Nacida para liderar con el corazón.', element:'Fuego', planet:'Marte', archetype:'La Líder', gem:'Granate', color:'Rojo escarlata' },
    'andrés': { origin:'Griego', lang:'Griego antiguo', meaning:'El varonil, el valiente. Portador del fuego sagrado de la acción.', element:'Fuego', planet:'Marte', archetype:'El Guerrero', gem:'Rubí', color:'Rojo' },
    'ángel': { origin:'Griego', lang:'Griego antiguo', meaning:'Mensajero divino. El que lleva noticias del cosmos al mundo material.', element:'Aire', planet:'Mercurio', archetype:'El Mensajero', gem:'Selenita', color:'Blanco iridiscente' },
    'ángela': { origin:'Griego', lang:'Griego antiguo', meaning:'Mensajera divina. Puente entre el cielo y la tierra.', element:'Aire', planet:'Mercurio', archetype:'La Mensajera', gem:'Cuarzo claro', color:'Blanco luminoso' },
    'antonio': { origin:'Latino', lang:'Latín', meaning:'De la familia Antonia romana. El que merece elogio; portador de honor.', element:'Fuego', planet:'Sol', archetype:'El Honorable', gem:'Ámbar', color:'Dorado cálido' },
    'arturo': { origin:'Celta', lang:'Celta/Bretón antiguo', meaning:'El oso. El rey legendario; símbolo de fuerza, liderazgo y magia.', element:'Tierra', planet:'Saturno', archetype:'El Rey', gem:'Rubí estrella', color:'Borgoña' },
    // B
    'beatriz': { origin:'Latino', lang:'Latín', meaning:'La que trae felicidad y bendición. Guía de almas, como la Beatriz de Dante.', element:'Luz', planet:'Sol', archetype:'La Guía', gem:'Diamante', color:'Blanco dorado' },
    'belén': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Casa del pan. Tierra de abundancia y sagrado origen.', element:'Tierra', planet:'Venus', archetype:'La Nutricia', gem:'Jade', color:'Verde' },
    'benjamín': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Hijo de la mano derecha, el favorito. Portador de fortuna y protección divina.', element:'Tierra', planet:'Júpiter', archetype:'El Bendecido', gem:'Citrino', color:'Amarillo dorado' },
    'blanca': { origin:'Germánico', lang:'Germánico antiguo', meaning:'Pura, luminosa. La que irradia claridad y limpieza de espíritu.', element:'Éter', planet:'Luna', archetype:'La Pura', gem:'Cuarzo blanco', color:'Blanco' },
    // C
    'camila': { origin:'Latino', lang:'Latín/Etrusco', meaning:'La que sirve al altar. Sacerdotisa de luz, intermediaria entre lo sagrado y lo humano.', element:'Fuego', planet:'Sol', archetype:'La Sacerdotisa', gem:'Topacio blanco', color:'Dorado' },
    'carlos': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El hombre libre. Viril, fuerte e independiente; espíritu de rey.', element:'Fuego', planet:'Sol', archetype:'El Rey Libre', gem:'Diamante', color:'Dorado real' },
    'carmen': { origin:'Hebreo/Latino', lang:'Hebreo antiguo', meaning:'Viña, jardín de Dios. También "carmen" en latín: poema, encantamiento.', element:'Agua', planet:'Venus', archetype:'La Encantadora', gem:'Granada', color:'Carmesí' },
    'catalina': { origin:'Griego', lang:'Griego antiguo', meaning:'La pura, la inmaculada. Herencia de grandes reinas y santas.', element:'Tierra', planet:'Saturno', archetype:'La Reina Sabia', gem:'Zafiro', color:'Azul real' },
    'césar': { origin:'Latino', lang:'Latín', meaning:'El que fue sacado por corte; el conquistador nacido con poder.', element:'Fuego', planet:'Sol', archetype:'El Emperador', gem:'Rubí', color:'Púrpura imperial' },
    'claudia': { origin:'Latino', lang:'Latín', meaning:'De la gens Claudia. La que superó la adversidad y emerge con dignidad.', element:'Tierra', planet:'Saturno', archetype:'La Resiliente', gem:'Ónix', color:'Negro profundo' },
    'cristian': { origin:'Griego/Latino', lang:'Griego antiguo', meaning:'El ungido, el consagrado. Portador de la luz crística.', element:'Luz', planet:'Sol', archetype:'El Consagrado', gem:'Cuarzo claro', color:'Blanco luminoso' },
    'cristina': { origin:'Griego/Latino', lang:'Griego antiguo', meaning:'La ungida. Portadora de la energía crística de compasión y servicio.', element:'Agua', planet:'Neptuno', archetype:'La Compasiva', gem:'Aguamarina', color:'Azul cristalino' },
    // D
    'daniel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios es mi juez. El vidente, el profeta; el que descifra los sueños.', element:'Éter', planet:'Urano', archetype:'El Profeta', gem:'Lapislázuli', color:'Azul índigo' },
    'daniela': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios es mi jueza. Intuitiva, visionaria, con conexión directa a lo divino.', element:'Éter', planet:'Neptuno', archetype:'La Visionaria', gem:'Amatista', color:'Violeta' },
    'david': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Amado. El rey poeta; guerrero del espíritu y del corazón.', element:'Fuego', planet:'Sol', archetype:'El Rey Poeta', gem:'Rubí', color:'Rojo dorado' },
    'diana': { origin:'Latino', lang:'Latín', meaning:'Diosa de la luna y la caza. Libre, salvaje, protectora de la naturaleza.', element:'Agua', planet:'Luna', archetype:'La Cazadora Lunar', gem:'Moonstone', color:'Plateado' },
    'diego': { origin:'Hebreo/Griego', lang:'Hebreo antiguo', meaning:'El que suplanta, el que aprende. Sinónimo de Santiago; espíritu peregrino.', element:'Tierra', planet:'Saturno', archetype:'El Peregrino', gem:'Turmalina', color:'Marrón tierra' },
    // E
    'edgar': { origin:'Anglosajón', lang:'Anglosajón antiguo', meaning:'Guardián de la prosperidad. El que protege la riqueza del espíritu.', element:'Tierra', planet:'Júpiter', archetype:'El Guardián', gem:'Citrino', color:'Dorado' },
    'eduardo': { origin:'Anglosajón', lang:'Anglosajón antiguo', meaning:'Guardián de la fortuna. De "ead" (riqueza) y "weard" (guardia).', element:'Tierra', planet:'Júpiter', archetype:'El Custodio', gem:'Jade', color:'Verde dorado' },
    'elena': { origin:'Griego', lang:'Griego antiguo', meaning:'La que brilla como la antorcha. Helena, la más bella de Troya.', element:'Fuego', planet:'Sol', archetype:'La Radiante', gem:'Topacio dorado', color:'Dorado solar' },
    'elisa': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios es mi juramento, la consagrada. Energía de devoción pura.', element:'Agua', planet:'Venus', archetype:'La Devota', gem:'Cuarzo rosa', color:'Rosa suave' },
    'emilia': { origin:'Latino', lang:'Latín', meaning:'De la gens Aemilia; la rival, la que aspira a la excelencia.', element:'Fuego', planet:'Marte', archetype:'La Ambiciosa del Corazón', gem:'Granate', color:'Carmesí' },
    'ernesto': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El que lucha con ardor. Serio, comprometido, fiero en sus ideales.', element:'Fuego', planet:'Marte', archetype:'El Combatiente', gem:'Rubí oscuro', color:'Rojo profundo' },
    'esteban': { origin:'Griego', lang:'Griego antiguo', meaning:'Corona, guirnalda. El que lleva la corona del espíritu.', element:'Tierra', planet:'Saturno', archetype:'El Coronado', gem:'Diamante negro', color:'Negro y dorado' },
    'estrella': { origin:'Latino', lang:'Latín', meaning:'Astro luminoso. Nacida para brillar y orientar a otros en la oscuridad.', element:'Fuego', planet:'Sol', archetype:'La Estrella Guía', gem:'Diamante', color:'Blanco brillante' },
    // F
    'fabián': { origin:'Latino', lang:'Latín', meaning:'De la familia Fabia; el cultivador de habas. Conectado a la tierra y la abundancia.', element:'Tierra', planet:'Venus', archetype:'El Cultivador', gem:'Esmeralda', color:'Verde' },
    'fernanda': { origin:'Germánico', lang:'Germánico antiguo', meaning:'Atrevida en la paz. Combinación de valor y armonía.', element:'Aire', planet:'Urano', archetype:'La Pacífica Audaz', gem:'Turquesa', color:'Azul turquesa' },
    'fernando': { origin:'Germánico', lang:'Germánico antiguo', meaning:'Atrevido en la paz. El que logra la armonía con coraje.', element:'Fuego', planet:'Marte', archetype:'El Diplomático Guerrero', gem:'Lapislázuli', color:'Azul real' },
    'francisca': { origin:'Germánico/Latino', lang:'Latín medieval', meaning:'La libre, la franca. Espíritu de libertad y generosidad franciscana.', element:'Aire', planet:'Júpiter', archetype:'La Libre', gem:'Amatista', color:'Violeta' },
    'francisco': { origin:'Germánico/Latino', lang:'Latín medieval', meaning:'El hombre libre, el franco. Portador del espíritu de San Francisco: amor a la naturaleza y la sencillez.', element:'Tierra', planet:'Júpiter', archetype:'El Franciscano', gem:'Turquesa', color:'Marrón franciscano' },
    // G
    'gabriela': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios es mi fortaleza. La heroína, la que lleva la fuerza divina.', element:'Fuego', planet:'Marte', archetype:'La Heroína', gem:'Rubí', color:'Rojo' },
    'gabriel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios es mi fortaleza. El arcángel mensajero; entre los más poderosos.', element:'Fuego', planet:'Sol', archetype:'El Arcángel', gem:'Lapislázuli', color:'Azul y dorado' },
    'gloria': { origin:'Latino', lang:'Latín', meaning:'Fama, honor glorioso. La que merece ser exaltada.', element:'Fuego', planet:'Sol', archetype:'La Gloriosa', gem:'Rubí estrella', color:'Dorado' },
    'gonzalo': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El combate de los elfos. Guerrero mágico, de fuerzas visibles e invisibles.', element:'Fuego', planet:'Marte', archetype:'El Guerrero Mágico', gem:'Granate', color:'Rojo oscuro' },
    'guadalupe': { origin:'Árabe/Latino', lang:'Árabe-español', meaning:'Río de amor del lobo. Lugar sagrado; virgen protectora de México.', element:'Agua', planet:'Luna', archetype:'La Protectora Sagrada', gem:'Jade verde', color:'Verde y azul' },
    'guillermo': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El que desea proteger. De "wil" (voluntad) y "helm" (yelmo).', element:'Tierra', planet:'Saturno', archetype:'El Protector', gem:'Ónix', color:'Negro y plata' },
    // H
    'héctor': { origin:'Griego', lang:'Griego antiguo', meaning:'El que sostiene, el que retiene. El más noble guerrero de Troya.', element:'Tierra', planet:'Saturno', archetype:'El Guardián Heroico', gem:'Turmalina negra', color:'Azul oscuro' },
    'hernando': { origin:'Germánico', lang:'Germánico antiguo', meaning:'Aventurero audaz. Espíritu explorador e intrépido.', element:'Fuego', planet:'Marte', archetype:'El Explorador', gem:'Ámbar', color:'Naranja dorado' },
    'hugo': { origin:'Germánico', lang:'Germánico antiguo', meaning:'Mente, espíritu. El de pensamiento profundo y grande inteligencia.', element:'Aire', planet:'Mercurio', archetype:'El Pensador', gem:'Fluorita', color:'Violeta y verde' },
    // I
    'ignacio': { origin:'Latino', lang:'Latín', meaning:'El que tiene fuego. Ardiente por naturaleza; de la llama de Íñigo.', element:'Fuego', planet:'Sol', archetype:'El Ardiente', gem:'Rubí', color:'Rojo naranja' },
    'inés': { origin:'Griego', lang:'Griego antiguo', meaning:'La pura, la casta. De agnos: cordero sagrado, símbolo de inocencia divina.', element:'Agua', planet:'Luna', archetype:'La Inocente Sagrada', gem:'Cuarzo blanco', color:'Blanco' },
    'irene': { origin:'Griego', lang:'Griego antiguo', meaning:'La paz. Diosa griega de la paz; portadora de armonía cósmica.', element:'Aire', planet:'Venus', archetype:'La Pacificadora', gem:'Aquamarina', color:'Azul cielo' },
    'isabel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Mi Dios es abundancia. También: el que jura por Dios. Energía de reinas.', element:'Tierra', planet:'Saturno', archetype:'La Reina', gem:'Esmeralda', color:'Verde real' },
    'ivan': { origin:'Hebreo/Eslavo', lang:'Hebreo-eslavo', meaning:'Dios es misericordioso. Juan en su forma eslava; vibrante y protegido.', element:'Agua', planet:'Luna', archetype:'El Misericordioso', gem:'Perla', color:'Azul lunar' },
    // J
    'javier': { origin:'Vasco/Árabe', lang:'Vasco', meaning:'Nuevo hogar, castillo nuevo. El que construye su reino interior.', element:'Tierra', planet:'Saturno', archetype:'El Constructor', gem:'Turmalina', color:'Verde oscuro' },
    'jessica': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'La que ve, la visionaria. De "Iscah": observadora perspicaz.', element:'Aire', planet:'Urano', archetype:'La Vidente', gem:'Lapislázuli', color:'Azul índigo' },
    'jesús': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Yahvé salva. La vibración más elevada de salvación y amor incondicional.', element:'Luz', planet:'Sol', archetype:'El Salvador', gem:'Diamante', color:'Blanco y dorado' },
    'jorge': { origin:'Griego', lang:'Griego antiguo', meaning:'El agricultor, el que trabaja la tierra. El caballero que vence al dragón.', element:'Tierra', planet:'Saturno', archetype:'El Caballero', gem:'Esmeralda', color:'Verde' },
    'josé': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Que Dios añada. El de la fortuna acumulada; el soñador de sueños.', element:'Tierra', planet:'Júpiter', archetype:'El Soñador Profético', gem:'Citrino', color:'Amarillo dorado' },
    'josefina': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Que Dios añada gracia. Energía de emperatriz y de gracia acumulada.', element:'Agua', planet:'Venus', archetype:'La Emperatriz', gem:'Cuarzo rosa', color:'Rosa dorado' },
    'juan': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios es misericordioso. Una de las vibraciones más extendidas y poderosas.', element:'Agua', planet:'Luna', archetype:'El Apóstol', gem:'Perla', color:'Azul plateado' },
    'julia': { origin:'Latino', lang:'Latín', meaning:'De la gens Julia; joven, llena de vitalidad. Heredera de Julio César.', element:'Fuego', planet:'Sol', archetype:'La Joven Eterna', gem:'Topacio', color:'Dorado solar' },
    'julián': { origin:'Latino', lang:'Latín', meaning:'De Júpiter o Julio; el joven y poderoso. Conectado a la expansión joviana.', element:'Fuego', planet:'Júpiter', archetype:'El Expansivo', gem:'Citrino', color:'Azul y dorado' },
    'julio': { origin:'Latino', lang:'Latín', meaning:'De la gens Julia; el mes sagrado del solsticio. Portador del fuego solar.', element:'Fuego', planet:'Sol', archetype:'El Solar', gem:'Ámbar', color:'Naranja solar' },
    // K
    'karen': { origin:'Griego/Danés', lang:'Griego antiguo', meaning:'La pura. Forma escandinava de Catalina; vibración de pureza y claridad.', element:'Agua', planet:'Luna', archetype:'La Cristalina', gem:'Cuarzo claro', color:'Blanco azulado' },
    'kevin': { origin:'Irlandés', lang:'Irlandés antiguo', meaning:'Nacido hermoso. De Caoimhín: gentil y amable de nacimiento.', element:'Aire', planet:'Venus', archetype:'El Gentil', gem:'Aventurina', color:'Verde suave' },
    // L
    'laura': { origin:'Latino', lang:'Latín', meaning:'La laureada, la coronada de laurel. Símbolo de triunfo y victoria eterna.', element:'Fuego', planet:'Sol', archetype:'La Victoriosa', gem:'Citrino dorado', color:'Dorado' },
    'leandro': { origin:'Griego', lang:'Griego antiguo', meaning:'León hombre. El que tiene el valor del rey de la selva.', element:'Fuego', planet:'Sol', archetype:'El León', gem:'Rubí', color:'Naranja dorado' },
    'leonor': { origin:'Griego/Provenzal', lang:'Provenzal antiguo', meaning:'La que tiene luz propia. Nombre de reinas medievales legendarias.', element:'Fuego', planet:'Sol', archetype:'La Luminosa', gem:'Topacio imperial', color:'Dorado' },
    'lorena': { origin:'Francés/Latino', lang:'Latino-francés', meaning:'De Lorena; la laureada. Espíritu de victoria y elegancia.', element:'Aire', planet:'Venus', archetype:'La Elegante', gem:'Perla', color:'Blanco nacarado' },
    'lucas': { origin:'Griego/Latino', lang:'Griego antiguo', meaning:'El que lleva la luz. Evangelista; portador de la llama del conocimiento.', element:'Fuego', planet:'Sol', archetype:'El Portador de Luz', gem:'Topacio claro', color:'Dorado claro' },
    'lucía': { origin:'Latino', lang:'Latín', meaning:'La luminosa, la que nació con la luz. Patrona de la visión interior.', element:'Fuego', planet:'Sol', archetype:'La Lumínica', gem:'Diamante', color:'Blanco brillante' },
    'luis': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El combatiente glorioso. De "Hlodwig": guerrero célebre.', element:'Fuego', planet:'Marte', archetype:'El Glorioso', gem:'Rubí', color:'Azul real' },
    'luisa': { origin:'Germánico', lang:'Germánico antiguo', meaning:'La combatiente gloriosa. Energía de guerrera sabia y reina.', element:'Fuego', planet:'Sol', archetype:'La Guerrera Luminosa', gem:'Rubí claro', color:'Rojo y dorado' },
    // M
    'manuel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios con nosotros. Emmanuel; vibración de presencia divina encarnada.', element:'Éter', planet:'Sol', archetype:'El Divino Encarnado', gem:'Diamante', color:'Blanco y dorado' },
    'manuela': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios con nosotras. Presencia divina femenina, gracia encarnada.', element:'Agua', planet:'Luna', archetype:'La Gracia Encarnada', gem:'Moonstone', color:'Blanco nacarado' },
    'marcela': { origin:'Latino', lang:'Latín', meaning:'Consagrada a Marte. La guerrera que combina acción y ternura.', element:'Fuego', planet:'Marte', archetype:'La Guerrera Tierna', gem:'Granate', color:'Rojo' },
    'marco': { origin:'Latino', lang:'Latín', meaning:'Consagrado a Marte, el guerrero. El defensor y el líder nato.', element:'Fuego', planet:'Marte', archetype:'El Defensor', gem:'Rubí', color:'Rojo' },
    'margarita': { origin:'Griego', lang:'Griego antiguo', meaning:'La perla. La joya rara, la de valor incalculable que emerge de la oscuridad.', element:'Agua', planet:'Luna', archetype:'La Perla', gem:'Perla', color:'Blanco iridiscente' },
    'maría': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'La amada de Dios; el mar de la amargura transformada en amor. La vibración más universal del mundo.', element:'Agua', planet:'Luna', archetype:'La Gran Madre', gem:'Moonstone', color:'Azul virginal' },
    'mario': { origin:'Latino', lang:'Latín', meaning:'Viril, de Marte. El guerrero noble; héroe de la República romana.', element:'Fuego', planet:'Marte', archetype:'El Guerrero Noble', gem:'Rubí', color:'Rojo y negro' },
    'martín': { origin:'Latino', lang:'Latín', meaning:'Consagrado a Marte. El que lucha por los ideales más elevados.', element:'Fuego', planet:'Marte', archetype:'El Reformador', gem:'Granate', color:'Rojo profundo' },
    'mateo': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Don de Dios. El evangelista; el que registra la palabra sagrada.', element:'Tierra', planet:'Mercurio', archetype:'El Escriba Sagrado', gem:'Aguamarina', color:'Verde azulado' },
    'mauricio': { origin:'Latino', lang:'Latín', meaning:'El moro, el oscuro como la noche. El que guarda los misterios.', element:'Éter', planet:'Urano', archetype:'El Misterioso', gem:'Turmalina negra', color:'Negro estrellado' },
    'maximiliano': { origin:'Latino', lang:'Latín', meaning:'El más grande. Combinación de Máximo y Emiliano; destino de grandeza.', element:'Fuego', planet:'Júpiter', archetype:'El Magnífico', gem:'Citrino imperial', color:'Dorado real' },
    'maya': { origin:'Sánscrito/Latino', lang:'Sánscrito', meaning:'Ilusión cósmica, energía creadora. La que teje el velo de la realidad.', element:'Éter', planet:'Neptuno', archetype:'La Tejedora del Cosmos', gem:'Labradorita', color:'Iridiscente' },
    'miguel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'¿Quién como Dios? El arcángel guerrero supremo.', element:'Fuego', planet:'Sol', archetype:'El Arcángel Guerrero', gem:'Rubí', color:'Dorado y rojo' },
    'milagros': { origin:'Latino', lang:'Latín', meaning:'Los milagros. La que porta la energía de lo imposible hecho posible.', element:'Éter', planet:'Neptuno', archetype:'La Hacedora de Milagros', gem:'Cuarzo claro', color:'Blanco luminoso' },
    // N
    'natalia': { origin:'Latino', lang:'Latín', meaning:'La nacida en Navidad, en el día de la natividad. Energía de regalo y presencia.', element:'Fuego', planet:'Sol', archetype:'El Regalo del Cielo', gem:'Rubí navideño', color:'Rojo y dorado' },
    'nicolás': { origin:'Griego', lang:'Griego antiguo', meaning:'Victoria del pueblo. El líder popular, el que vence en nombre de todos.', element:'Fuego', planet:'Júpiter', archetype:'El Victorioso Popular', gem:'Zafiro', color:'Azul real' },
    'nora': { origin:'Hebreo/Latino', lang:'Latín', meaning:'Honor, la honorable. Energía de dignidad y respeto natural.', element:'Tierra', planet:'Saturno', archetype:'La Honorable', gem:'Ónix', color:'Negro y plata' },
    // O
    'óscar': { origin:'Escandinavo/Irlandés', lang:'Nórdico antiguo', meaning:'El amigo de los dioses. Guerrero divino, el elegido de los cielos.', element:'Fuego', planet:'Sol', archetype:'El Elegido', gem:'Ópalo', color:'Multicolor' },
    // P
    'pablo': { origin:'Latino', lang:'Latín', meaning:'El pequeño, el humilde. San Pablo: el perseguidor transformado en apóstol supremo.', element:'Tierra', planet:'Mercurio', archetype:'El Transformado', gem:'Lapislázuli', color:'Azul intenso' },
    'patricia': { origin:'Latino', lang:'Latín', meaning:'La patricia, la noble. Portadora de linaje aristocrático del espíritu.', element:'Tierra', planet:'Saturno', archetype:'La Aristócrata', gem:'Zafiro', color:'Azul real' },
    'paula': { origin:'Latino', lang:'Latín', meaning:'La pequeña, la humilde de corazón grande. Sabiduría en la sencillez.', element:'Tierra', planet:'Saturno', archetype:'La Humilde Sabia', gem:'Perla gris', color:'Gris plata' },
    'pedro': { origin:'Griego', lang:'Griego antiguo', meaning:'La roca. El pilar sobre el que se construye lo eterno.', element:'Tierra', planet:'Saturno', archetype:'El Pilar', gem:'Granito negro', color:'Gris piedra' },
    // R
    'rafael': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Dios ha sanado. El arcángel sanador; portador de medicina divina.', element:'Agua', planet:'Venus', archetype:'El Sanador', gem:'Esmeralda', color:'Verde sanador' },
    'ramón': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El que protege con sabiduría. De "Raginmund": consejo protector.', element:'Tierra', planet:'Saturno', archetype:'El Sabio Protector', gem:'Turmalina', color:'Marrón y verde' },
    'raquel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'La oveja, la inocente. Amada profundamente; la del amor que espera.', element:'Tierra', planet:'Venus', archetype:'La Amada Paciente', gem:'Cuarzo rosa', color:'Rosa suave' },
    'rebeca': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'La que ata con lazos. La que une; matriarca de gran linaje.', element:'Agua', planet:'Luna', archetype:'La Matriarca', gem:'Perla', color:'Blanco' },
    'renata': { origin:'Latino', lang:'Latín', meaning:'La renacida. La que ha pasado por la transformación y emerge renovada.', element:'Agua', planet:'Plutón', archetype:'La Renacida', gem:'Obsidiana', color:'Negro y violeta' },
    'ricardo': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El rey poderoso. De "ric" (poder) y "hard" (fuerte): poder absoluto.', element:'Fuego', planet:'Sol', archetype:'El Rey Poderoso', gem:'Rubí estrella', color:'Rojo real' },
    'roberto': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El de la fama brillante. De "Hrodebert": brillante en la batalla.', element:'Fuego', planet:'Marte', archetype:'El Glorioso en Batalla', gem:'Granate', color:'Rojo brillante' },
    'rodrigo': { origin:'Germánico', lang:'Germánico antiguo', meaning:'El famoso por su poder. El Cid; el señor legendario.', element:'Fuego', planet:'Marte', archetype:'El Señor Legendario', gem:'Rubí', color:'Rojo y negro' },
    'rosa': { origin:'Latino', lang:'Latín', meaning:'La flor más sagrada. El amor perfecto, la belleza completa.', element:'Agua', planet:'Venus', archetype:'La Flor del Amor', gem:'Cuarzo rosa', color:'Rosa' },
    // S
    'samuel': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Su nombre es Dios, o Dios lo escuchó. El profeta supremo de Israel.', element:'Éter', planet:'Saturno', archetype:'El Profeta', gem:'Zafiro oscuro', color:'Azul nocturno' },
    'sandra': { origin:'Griego', lang:'Griego antiguo', meaning:'Defensora de la humanidad. Forma corta de Alejandra; guerrera protectora.', element:'Fuego', planet:'Marte', archetype:'La Protectora', gem:'Rubí', color:'Rojo' },
    'santiago': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Santiago apóstol; Dios protege. El peregrino cósmico que busca la verdad.', element:'Tierra', planet:'Saturno', archetype:'El Peregrino Sagrado', gem:'Turquesa', color:'Azul Camino de Santiago' },
    'sara': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'Princesa. La matriarca original; madre de multitudes.', element:'Tierra', planet:'Venus', archetype:'La Princesa Ancestral', gem:'Rubí', color:'Rojo y dorado' },
    'sebastián': { origin:'Griego', lang:'Griego antiguo', meaning:'El venerable, el augusto. El de la dignidad que impone respeto.', element:'Tierra', planet:'Saturno', archetype:'El Venerable', gem:'Zafiro estrella', color:'Azul profundo' },
    'silvia': { origin:'Latino', lang:'Latín', meaning:'La del bosque. Conectada a la naturaleza salvaje y la sabiduría de los árboles.', element:'Tierra', planet:'Venus', archetype:'La del Bosque', gem:'Aventurina verde', color:'Verde bosque' },
    'sofía': { origin:'Griego', lang:'Griego antiguo', meaning:'Sabiduría. La vibración más elevada del conocimiento divino femenino.', element:'Aire', planet:'Mercurio', archetype:'La Sabia', gem:'Lapislázuli', color:'Azul índigo' },
    // T
    'tamara': { origin:'Hebreo', lang:'Hebreo antiguo', meaning:'La palmera. La que crece esplendorosa y da fruto en el desierto.', element:'Tierra', planet:'Saturno', archetype:'La Palmera del Desierto', gem:'Ámbar', color:'Naranja cálido' },
    'teresa': { origin:'Griego', lang:'Griego antiguo', meaning:'La cazadora, o la que veranda/veranea. Santa Teresa: mística suprema.', element:'Fuego', planet:'Sol', archetype:'La Mística', gem:'Amatista dorada', color:'Morado y dorado' },
    'tomás': { origin:'Arameo', lang:'Arameo', meaning:'El gemelo. El que busca la prueba; el que transforma la duda en fe.', element:'Tierra', planet:'Saturno', archetype:'El Inquisidor del Alma', gem:'Obsidiana', color:'Negro intenso' },
    // V
    'valentín': { origin:'Latino', lang:'Latín', meaning:'El fuerte, el valiente. Patrón del amor universal.', element:'Fuego', planet:'Venus', archetype:'El Amante Valiente', gem:'Rubí rosa', color:'Rojo rosa' },
    'valentina': { origin:'Latino', lang:'Latín', meaning:'La fuerte y valiente. La que ama con fuerza y sin miedo.', element:'Fuego', planet:'Venus', archetype:'La Guerrera del Amor', gem:'Rosa cuarzo', color:'Rojo y rosa' },
    'valeria': { origin:'Latino', lang:'Latín', meaning:'La fuerte, la vigorosa. De "Valerius": la que tiene valor y salud.', element:'Fuego', planet:'Marte', archetype:'La Vigorosa', gem:'Granate rojo', color:'Rojo escarlata' },
    'vanessa': { origin:'Griego/Inventado', lang:'Inglés literario', meaning:'Creada por Jonathan Swift de "Esvanthe": la mariposa; transformación constante.', element:'Aire', planet:'Urano', archetype:'La Mariposa', gem:'Labradorita', color:'Iridiscente' },
    'verónica': { origin:'Griego/Latino', lang:'Griego antiguo', meaning:'La que trae la verdadera imagen. La que enjugó el rostro de Cristo.', element:'Agua', planet:'Neptuno', archetype:'La Portadora de la Verdad', gem:'Cuarzo fantasma', color:'Blanco y dorado' },
    'víctor': { origin:'Latino', lang:'Latín', meaning:'El vencedor. La vibración del triunfo absoluto.', element:'Fuego', planet:'Sol', archetype:'El Vencedor', gem:'Diamante', color:'Dorado y blanco' },
    'victoria': { origin:'Latino', lang:'Latín', meaning:'La victoria. La diosa alada del triunfo absoluto.', element:'Fuego', planet:'Sol', archetype:'La Diosa Victoriosa', gem:'Diamante', color:'Dorado' },
    'violeta': { origin:'Latino', lang:'Latín', meaning:'La flor de la humildad y la espiritualidad. Vibración del chakra de la corona.', element:'Éter', planet:'Urano', archetype:'La Espiritual', gem:'Amatista', color:'Violeta' },
    // X, Y, Z
    'xavier': { origin:'Vasco', lang:'Vasco', meaning:'Casa nueva o brillante. El fundador que construye un nuevo hogar espiritual.', element:'Tierra', planet:'Saturno', archetype:'El Fundador', gem:'Jade', color:'Verde oscuro' },
    'ximena': { origin:'Hebreo/Vasco', lang:'Vasco', meaning:'La que escucha. La que sabe recibir la voz del cosmos.', element:'Agua', planet:'Luna', archetype:'La Escuchadora', gem:'Moonstone', color:'Plateado' },
    'yolanda': { origin:'Griego', lang:'Griego antiguo', meaning:'La flor violeta. La que florece en la espiritualidad más alta.', element:'Éter', planet:'Urano', archetype:'La Flor Mística', gem:'Amatista', color:'Violeta' },
    'zaira': { origin:'Árabe', lang:'Árabe antiguo', meaning:'La que florece, la luminosa. Portadora de luz y florecimiento.', element:'Fuego', planet:'Sol', archetype:'La Floreciente', gem:'Citrino', color:'Dorado cálido' }
  };

  // ══════════════════════════════════════════
  // BASE DE DATOS DE APELLIDOS (150+ entradas)
  // ══════════════════════════════════════════
  var SURNAMES_DB = {
    'aguilar': { origin:'Latino', meaning:'El que vive donde habitan las águilas. Linaje de visión aguda y espíritu libre.', lineage:'Noble cazador', territory:'Regiones montañosas de España' },
    'aguilera': { origin:'Latino', meaning:'Lugar de águilas. Linaje que habita las alturas; perspectiva elevada.', lineage:'Los de la cima', territory:'Castilla, España' },
    'álvarez': { origin:'Germánico', meaning:'Hijo del que protege con sabiduría. Linaje de guardianes.', lineage:'Los Custodios', territory:'Asturias, España' },
    'arce': { origin:'Latino', meaning:'El arce; árbol de la transformación y la dulzura. Linaje de adaptabilidad.', lineage:'Los del árbol sagrado', territory:'Cantabria, España' },
    'arias': { origin:'Latino/Germánico', meaning:'Vigoroso, ariete. Linaje de fuerza directa y acción decidida.', lineage:'Los Arietes', territory:'Galicia y Asturias, España' },
    'ayala': { origin:'Vasco', meaning:'Sitio con prado en ladera. Linaje de arraigo a la tierra fértil.', lineage:'Los del Valle Fértil', territory:'País Vasco, España' },
    'barreto': { origin:'Vasco/Portugués', meaning:'Relacionado con el barro, la tierra. Linaje de creadores.', lineage:'Los Alfareros del Alma', territory:'Portugal y Galicia' },
    'blanco': { origin:'Germánico', meaning:'El blanco, el puro. Linaje de claridad y nobleza de espíritu.', lineage:'Los Puros', territory:'España medieval' },
    'bravo': { origin:'Latino', meaning:'El valiente, el feroz. Linaje de guerreros y líderes naturales.', lineage:'Los Valientes', territory:'España e Iberoamérica' },
    'bustos': { origin:'Latino', meaning:'Lugar donde hay bueyes; establo. Linaje de trabajo y abundancia.', lineage:'Los Labradores', territory:'Castilla, España' },
    'cabrera': { origin:'Latino', meaning:'Lugar donde hay cabras; el cabrero. Linaje de libertad e independencia.', lineage:'Los Libres', territory:'España' },
    'calvo': { origin:'Latino', meaning:'El calvo; el de cabeza descubierta ante el cosmos. Linaje de sabiduría.', lineage:'Los Sabios', territory:'España medieval' },
    'campos': { origin:'Latino', meaning:'De los campos abiertos. Linaje de expansión y libertad.', lineage:'Los del Campo Abierto', territory:'Iberoamérica' },
    'cardenas': { origin:'Latino', meaning:'Lugar de cardos; planta que florece en la adversidad.', lineage:'Los Resilientes', territory:'España y México' },
    'carrillo': { origin:'Latino', meaning:'El pequeño carro; el que transporta. Linaje de servicio y conexión.', lineage:'Los Conectores', territory:'España' },
    'castillo': { origin:'Latino', meaning:'El castillo; fortaleza. Linaje de protección y resistencia.', lineage:'Los Guardianes de la Fortaleza', territory:'España e Iberoamérica' },
    'castro': { origin:'Latino', meaning:'El castro, el campamento militar. Linaje de estrategia y disciplina.', lineage:'Los Estrategas', territory:'Galicia, España' },
    'chávez': { origin:'Latino/Portugués', meaning:'De Chaves; llaves. El que abre puertas y desbloquea caminos.', lineage:'Los que Abren Puertas', territory:'Portugal e Iberoamérica' },
    'contreras': { origin:'Latino', meaning:'Lugar opuesto, la ribera contraria. Linaje de pensamiento independiente.', lineage:'Los que Van Contra la Corriente', territory:'Castilla, España' },
    'corona': { origin:'Latino', meaning:'La corona. Linaje de realeza y liderazgo natural.', lineage:'Los de la Corona', territory:'España e Iberoamérica' },
    'cortés': { origin:'Latino', meaning:'El cortés, el de la corte. Linaje de refinamiento y diplomacia.', lineage:'Los Diplomáticos', territory:'España' },
    'cruz': { origin:'Latino', meaning:'La cruz; intersección de caminos. Linaje de sacrificio y redención.', lineage:'Los de la Encrucijada', territory:'España e Iberoamérica' },
    'cuevas': { origin:'Latino', meaning:'Las cuevas; lugares de iniciación y misterio.', lineage:'Los Iniciados', territory:'España' },
    'delgado': { origin:'Latino', meaning:'El delgado, el fino. Linaje de sutileza y percepción aguda.', lineage:'Los Sutiles', territory:'España' },
    'díaz': { origin:'Latino', meaning:'Hijo de Diego, hijo de Santiago. Linaje peregrino y protegido.', lineage:'Los Hijos del Apóstol', territory:'España e Iberoamérica' },
    'domínguez': { origin:'Latino', meaning:'Hijo del señor. Linaje de autoridad y liderazgo.', lineage:'Los Hijos del Señor', territory:'España' },
    'escalante': { origin:'Latino', meaning:'El que escala, el que asciende. Linaje de progreso y ambición.', lineage:'Los Escaladores', territory:'España' },
    'escobar': { origin:'Latino', meaning:'Lugar de escobas o matorrales; el que limpia. Linaje de purificación.', lineage:'Los Purificadores', territory:'España' },
    'espinosa': { origin:'Latino', meaning:'Lugar lleno de espinas; el que supera obstáculos. Linaje de resiliencia.', lineage:'Los Superadores', territory:'España' },
    'estrada': { origin:'Latino', meaning:'La estrada, la calle pavimentada. Linaje de constructores de caminos.', lineage:'Los Constructores de Caminos', territory:'España' },
    'fernández': { origin:'Germánico', meaning:'Hijo de Fernando; hijo del atrevido en la paz.', lineage:'Los Hijos del Valiente Pacífico', territory:'España e Iberoamérica' },
    'flores': { origin:'Latino', meaning:'Las flores. Linaje de belleza, crecimiento y renovación constante.', lineage:'Los que Florecen', territory:'España e Iberoamérica' },
    'franco': { origin:'Germánico', meaning:'El franco, el libre. Linaje de independencia y honestidad directa.', lineage:'Los Francos', territory:'Europa medieval' },
    'fuentes': { origin:'Latino', meaning:'Las fuentes de agua. Linaje de origen y vida; la fuente que da.', lineage:'Los que Dan Origen', territory:'España' },
    'gómez': { origin:'Germánico', meaning:'Hijo del hombre famoso. Linaje de fama heredada.', lineage:'Los de Noble Fama', territory:'España e Iberoamérica' },
    'gonzález': { origin:'Germánico', meaning:'Hijo del que lucha contra los elfos o el destino.', lineage:'Los Luchadores', territory:'España e Iberoamérica' },
    'guerrero': { origin:'Latino', meaning:'El guerrero. Linaje de combatientes y protectores.', lineage:'Los Guerreros', territory:'España e Iberoamérica' },
    'gutiérrez': { origin:'Germánico', meaning:'Hijo de Gutierre; señor de los ejércitos.', lineage:'Los Comandantes', territory:'España' },
    'guzmán': { origin:'Germánico/Árabe', meaning:'El buen hombre. Linaje de rectitud y virtud reconocida.', lineage:'Los Virtuosos', territory:'Castilla, España' },
    'herrera': { origin:'Latino', meaning:'El herrero. Linaje de forjadores; los que moldean el metal y el destino.', lineage:'Los Forjadores', territory:'España' },
    'hidalgo': { origin:'Latino', meaning:'Hijo de algo; el noble. Linaje de hidalguía y dignidad.', lineage:'Los Hidalgos', territory:'España' },
    'iglesias': { origin:'Latino', meaning:'Las iglesias; templos sagrados. Linaje de fe y espiritualidad.', lineage:'Los del Templo', territory:'Galicia, España' },
    'jiménez': { origin:'Vasco', meaning:'Hijo de Jimeno; el hijo de la conquista.', lineage:'Los Conquistadores', territory:'España e Iberoamérica' },
    'juárez': { origin:'Latino', meaning:'Hijo del que jura; linaje de pactos sagrados.', lineage:'Los que Juran y Cumplen', territory:'España y México' },
    'lara': { origin:'Latino/Celta', meaning:'De Lara; lugar de laureles. Linaje de victoria y sabiduría.', lineage:'Los Laureados', territory:'Castilla, España' },
    'leiva': { origin:'Vasco', meaning:'Lugar pantanoso; el que habita la zona de transición.', lineage:'Los del Umbral', territory:'España' },
    'leon': { origin:'Griego', meaning:'El león. Linaje de valor, majestuosidad y liderazgo.', lineage:'Los Leones', territory:'España e Iberoamérica' },
    'lópez': { origin:'Latino', meaning:'Hijo del lobo. Linaje de astucia, lealtad al clan y ferocidad protectora.', lineage:'Los Hijos del Lobo', territory:'España e Iberoamérica' },
    'luna': { origin:'Latino', meaning:'La luna. Linaje de ciclos, intuición y misterio lunar.', lineage:'Los Lunares', territory:'España e Iberoamérica' },
    'maldonado': { origin:'Latino', meaning:'El mal dado; el que superó una maldición ancestral.', lineage:'Los Redimidos', territory:'España' },
    'marin': { origin:'Latino', meaning:'Del mar. Linaje de viajeros y almas libres.', lineage:'Los del Mar', territory:'España' },
    'marquez': { origin:'Germánico', meaning:'Hijo del marqués; linaje de nobleza territorial.', lineage:'Los Nobles Territoriales', territory:'España' },
    'martínez': { origin:'Latino', meaning:'Hijo de Martín; hijo del guerrero de Marte.', lineage:'Los Hijos del Guerrero', territory:'España e Iberoamérica' },
    'medina': { origin:'Árabe', meaning:'La ciudad sagrada. Linaje de origen en la ciudad santa del Islam.', lineage:'Los de la Ciudad Santa', territory:'España (moros) e Iberoamérica' },
    'mendez': { origin:'Gallego', meaning:'Hijo del que defiende. Linaje de defensores y guardianes.', lineage:'Los Defensores', territory:'Galicia y Portugal' },
    'mendoza': { origin:'Vasco', meaning:'Lugar frío de la montaña. Linaje de resistencia y fortaleza.', lineage:'Los de la Montaña Fría', territory:'País Vasco, España' },
    'molina': { origin:'Latino', meaning:'El molino. Linaje de transformadores; los que muelen el grano de la vida.', lineage:'Los Transformadores', territory:'España' },
    'montoya': { origin:'Vasco', meaning:'El monte frío. Linaje de altura y resistencia ante el frío.', lineage:'Los de la Altura', territory:'España e Iberoamérica' },
    'mora': { origin:'Latino', meaning:'La mora o el moral; fruto oscuro y dulce. Linaje de profundidad.', lineage:'Los del Fruto Oscuro', territory:'España' },
    'morales': { origin:'Latino', meaning:'El moral o los morales. Linaje conectado a la rectitud y los valores.', lineage:'Los Virtuosos', territory:'España e Iberoamérica' },
    'moreno': { origin:'Latino', meaning:'El de tez morena. Linaje mediterráneo de calidez y pasión.', lineage:'Los del Sol', territory:'España e Iberoamérica' },
    'muñoz': { origin:'Latino', meaning:'Hijo de Munio; el que cuida. Linaje de cuidadores y protectores.', lineage:'Los Cuidadores', territory:'España' },
    'navarrete': { origin:'Vasco', meaning:'Llanura entre montañas de Navarra. Linaje de equilibrio.', lineage:'Los del Equilibrio', territory:'Navarra, España' },
    'navarro': { origin:'Vasco', meaning:'De Navarra; el llano. Linaje de raíces profundas en la tierra.', lineage:'Los de la Tierra Llana', territory:'España e Iberoamérica' },
    'nieto': { origin:'Latino', meaning:'El nieto. Linaje que honra y continúa la tradición ancestral.', lineage:'Los Continuadores', territory:'España' },
    'núñez': { origin:'Latino', meaning:'Hijo de Nuño; el tutor, el ayo. Linaje de educadores y guías.', lineage:'Los Guías', territory:'España' },
    'ojeda': { origin:'Vasco', meaning:'Lugar de alisos. Linaje conectado al árbol del agua.', lineage:'Los del Árbol del Agua', territory:'País Vasco' },
    'olivares': { origin:'Latino', meaning:'El olivar. Linaje de paz, sabiduría y abundancia mediterránea.', lineage:'Los del Olivo', territory:'España' },
    'orozco': { origin:'Vasco', meaning:'Lugar de oro. Linaje de riqueza ancestral y alquimia.', lineage:'Los del Oro', territory:'País Vasco, España' },
    'ortega': { origin:'Vasco/Latino', meaning:'La ortiga o la perdiz. Linaje de adaptación y supervivencia.', lineage:'Los Adaptadores', territory:'España' },
    'ortiz': { origin:'Latino', meaning:'Hijo de Fortún; el hijo de la fortuna.', lineage:'Los Hijos de la Fortuna', territory:'España' },
    'osorio': { origin:'Latino', meaning:'El que tiene osos. Linaje de fuerza ursina y poder natural.', lineage:'Los del Oso', territory:'España' },
    'padilla': { origin:'Latino', meaning:'La sartén pequeña o la llanura. Linaje de practicidad.', lineage:'Los Prácticos', territory:'España' },
    'paredes': { origin:'Latino', meaning:'Las paredes, los muros. Linaje de constructores y protectores.', lineage:'Los Constructores', territory:'España' },
    'patiño': { origin:'Vasco/Gallego', meaning:'El que patina o el del pato. Linaje de gracia en el movimiento.', lineage:'Los de la Gracia', territory:'Galicia y Colombia' },
    'paz': { origin:'Latino', meaning:'La paz. Linaje de armonía y reconciliación.', lineage:'Los Pacificadores', territory:'España e Iberoamérica' },
    'peña': { origin:'Latino', meaning:'La peña, la roca. Linaje de firmeza y solidez inquebrantable.', lineage:'Los de la Roca', territory:'España e Iberoamérica' },
    'peralta': { origin:'Vasco/Latino', meaning:'La roca alta. Linaje de elevación y nobleza.', lineage:'Los de la Roca Alta', territory:'España e Iberoamérica' },
    'pérez': { origin:'Latino', meaning:'Hijo de Pedro; hijo de la roca.', lineage:'Los Hijos de la Roca', territory:'España e Iberoamérica' },
    'ponce': { origin:'Latino', meaning:'Hijo de Poncio; el del mar de Ponto.', lineage:'Los del Gran Mar', territory:'España' },
    'prado': { origin:'Latino', meaning:'El prado verde. Linaje de abundancia, paz y naturaleza.', lineage:'Los del Prado', territory:'España' },
    'prieto': { origin:'Latino', meaning:'El oscuro, el apretado. Linaje de profundidad y concentración.', lineage:'Los Profundos', territory:'España' },
    'quintero': { origin:'Latino', meaning:'La quinta parte o el quinto. Linaje de orden y sistema.', lineage:'Los Ordenados', territory:'España y Venezuela' },
    'ramírez': { origin:'Germánico', meaning:'Hijo de Ramiro; hijo del consejero ilustre.', lineage:'Los Hijos del Consejero', territory:'España e Iberoamérica' },
    'ramos': { origin:'Latino', meaning:'Las ramas. Linaje de expansión y múltiples ramificaciones.', lineage:'Los Ramificados', territory:'España e Iberoamérica' },
    'rangel': { origin:'Germánico', meaning:'El brillante consejero. Linaje de sabiduría y buen consejo.', lineage:'Los Consejeros', territory:'España y México' },
    'reyes': { origin:'Latino', meaning:'Los reyes. Linaje de realeza y autoridad natural.', lineage:'Los Reyes', territory:'España e Iberoamérica' },
    'ríos': { origin:'Latino', meaning:'Los ríos. Linaje de fluidez, adaptación y vida.', lineage:'Los del Río', territory:'España e Iberoamérica' },
    'rivas': { origin:'Latino', meaning:'Las riberas. Linaje del margen del río; entre dos mundos.', lineage:'Los del Umbral Acuático', territory:'España' },
    'rivera': { origin:'Latino', meaning:'La ribera del río. Linaje de frontera y encuentro de mundos.', lineage:'Los de la Orilla', territory:'España e Iberoamérica' },
    'robles': { origin:'Latino', meaning:'Los robles. Linaje de fuerza, longevidad y arraigo profundo.', lineage:'Los del Roble', territory:'España' },
    'rodríguez': { origin:'Germánico', meaning:'Hijo de Rodrigo; hijo del de la fama poderosa.', lineage:'Los Hijos del Famoso', territory:'España e Iberoamérica' },
    'rojas': { origin:'Latino', meaning:'Las rojas; la tierra roja. Linaje de pasión y arraigo.', lineage:'Los de la Tierra Roja', territory:'España e Iberoamérica' },
    'romero': { origin:'Latino', meaning:'El peregrino de Roma o el romero (planta). Linaje de fe y pureza.', lineage:'Los Peregrinos', territory:'España e Iberoamérica' },
    'ruiz': { origin:'Germánico', meaning:'Hijo de Rodrigo; hijo del famoso. Forma abreviada.', lineage:'Los del Linaje Famoso', territory:'España e Iberoamérica' },
    'salazar': { origin:'Vasco', meaning:'Palacio de la sal. Linaje de preservación y valor añadido.', lineage:'Los del Palacio', territory:'País Vasco, España' },
    'salcedo': { origin:'Vasco/Latino', meaning:'Lugar de sauces. Linaje de flexibilidad y adaptación al agua.', lineage:'Los del Sauce', territory:'España' },
    'sánchez': { origin:'Latino', meaning:'Hijo de Sancho; hijo del sagrado, el bendecido.', lineage:'Los Hijos de lo Sagrado', territory:'España e Iberoamérica' },
    'sandoval': { origin:'Latino', meaning:'El bosque de las santas o bosque sagrado. Linaje místico.', lineage:'Los del Bosque Sagrado', territory:'España' },
    'santiago': { origin:'Hebreo', meaning:'Santiago; dios protege. Linaje bajo el manto del apóstol.', lineage:'Los Protegidos', territory:'España e Iberoamérica' },
    'santos': { origin:'Latino', meaning:'Los santos. Linaje de elevación espiritual y virtud.', lineage:'Los Santos', territory:'España e Iberoamérica' },
    'serrano': { origin:'Latino', meaning:'El serrano; habitante de la sierra. Linaje de altura y visión.', lineage:'Los de la Sierra', territory:'España' },
    'silva': { origin:'Latino', meaning:'El bosque. Linaje de misterio, naturaleza y sabiduría verde.', lineage:'Los del Bosque', territory:'Portugal e Iberoamérica' },
    'soler': { origin:'Latino', meaning:'El solar, el lugar. Linaje con raíces en la tierra propia.', lineage:'Los del Solar', territory:'Cataluña, España' },
    'solís': { origin:'Latino', meaning:'Del sol. Linaje de luz, energía solar y vitalidad.', lineage:'Los Solares', territory:'España' },
    'soto': { origin:'Latino', meaning:'El soto; bosque pequeño junto al río. Linaje de refugio.', lineage:'Los del Refugio Verde', territory:'España' },
    'suárez': { origin:'Latino', meaning:'Hijo del zapatero. Linaje que construye el camino paso a paso.', lineage:'Los Constructores del Camino', territory:'España' },
    'tejada': { origin:'Latino', meaning:'El tejado o teja. Linaje constructor de hogares y refugios.', lineage:'Los Constructores del Hogar', territory:'España' },
    'tinoco': { origin:'Vasco/Latino', meaning:'De origen incierto; posiblemente el de la tinaja.', lineage:'Los Preservadores', territory:'Portugal y España' },
    'torralba': { origin:'Árabe/Latino', meaning:'La torre blanca. Linaje de fortaleza y pureza.', lineage:'Los de la Torre Blanca', territory:'España' },
    'torres': { origin:'Latino', meaning:'Las torres. Linaje de fortaleza, vigilancia y liderazgo.', lineage:'Los de las Torres', territory:'España e Iberoamérica' },
    'trejo': { origin:'Latino', meaning:'El que vive entre las encinas. Linaje de fortaleza y sabiduría.', lineage:'Los de la Encina', territory:'España y México' },
    'uribe': { origin:'Vasco', meaning:'El pueblo nuevo. Linaje fundador y renovador.', lineage:'Los Fundadores', territory:'País Vasco y Colombia' },
    'valdez': { origin:'Germánico', meaning:'Hijo del valiente. Linaje de valentía heredada.', lineage:'Los Valientes', territory:'España e Iberoamérica' },
    'valencia': { origin:'Latino', meaning:'Valentía; ciudad de los valientes. Linaje de fuerza y vigor.', lineage:'Los Fuertes', territory:'España' },
    'vargas': { origin:'Vasco', meaning:'El terreno pantanoso; el de transición entre tierra y agua.', lineage:'Los del Umbral', territory:'España e Iberoamérica' },
    'vásquez': { origin:'Vasco', meaning:'Hijo del vasco. Linaje de origen vasco, el más antiguo de Europa.', lineage:'Los del Pueblo Primigenio', territory:'España e Iberoamérica' },
    'vega': { origin:'Latino', meaning:'La vega; la llanura fértil. Linaje de abundancia y productividad.', lineage:'Los de la Tierra Fértil', territory:'España e Iberoamérica' },
    'vera': { origin:'Latino', meaning:'La vera; la orilla o la verdadera. Linaje de autenticidad.', lineage:'Los Auténticos', territory:'España e Iberoamérica' },
    'villa': { origin:'Latino', meaning:'La villa, el pueblo. Linaje de comunidad y construcción colectiva.', lineage:'Los del Pueblo', territory:'España e Iberoamérica' },
    'villanueva': { origin:'Latino', meaning:'La villa nueva; el pueblo nuevo. Linaje de renovación.', lineage:'Los Renovadores', territory:'España e Iberoamérica' },
    'villareal': { origin:'Latino', meaning:'La villa real. Linaje de nobleza territorial.', lineage:'Los de la Villa Real', territory:'España' },
    'villaseñor': { origin:'Latino', meaning:'El señor de la villa. Linaje de autoridad y señorío local.', lineage:'Los Señores', territory:'España y México' },
    'zamora': { origin:'Celta/Árabe', meaning:'La ciudad de la zamora; ciudad fuerte junto al río.', lineage:'Los de la Ciudad Fuerte', territory:'España' },
    'zapata': { origin:'Vasco', meaning:'El que hace zapatos. Linaje que construye el camino para otros.', lineage:'Los Pavimentadores', territory:'España e Iberoamérica' },
    'zavala': { origin:'Vasco', meaning:'Llanura ancha. Linaje de visión amplia y generosidad.', lineage:'Los de la Llanura', territory:'País Vasco y España' }
  };

  // ══════════════════════════════════════════
  // COMPATIBILIDADES POR CAMINO DE VIDA
  // ══════════════════════════════════════════
  var COMPATIBILITY = {
    1: { best:[2,9,3], challenging:[1,4,8], soulmate:2, element:'Fuego solar', partner:'Alguien que inspire sin competir; el 2 te complementa con su intuición.' },
    2: { best:[1,4,6,8], challenging:[5,7], soulmate:1, element:'Agua lunar', partner:'El 1 te da dirección; juntos son la voluntad y la intuición en perfecta danza.' },
    3: { best:[1,5,7,9], challenging:[3,4,8], soulmate:9, element:'Fuego expresivo', partner:'El 9 te da profundidad filosófica que tu creatividad necesita.' },
    4: { best:[2,6,8], challenging:[3,5,7], soulmate:8, element:'Tierra sólida', partner:'El 8 valora tu disciplina; juntos construyen imperios duraderos.' },
    5: { best:[1,3,7,9], challenging:[4,5,6], soulmate:7, element:'Aire en movimiento', partner:'El 7 te da profundidad espiritual sin quitarte tu libertad.' },
    6: { best:[2,4,8,9], challenging:[3,5,6], soulmate:9, element:'Agua de vida', partner:'El 9 comparte tu amor por la humanidad; una unión de servicio y amor.' },
    7: { best:[3,5,9], challenging:[2,4,6,7], soulmate:5, element:'Éter místico', partner:'El 5 te saca de tu caparazón interior sin invadir tu mundo de ideas.' },
    8: { best:[2,4,6], challenging:[1,3,8], soulmate:4, element:'Tierra de poder', partner:'El 4 construye contigo de manera sólida y leal lo que el 8 sueña.' },
    9: { best:[3,6,7], challenging:[1,4,9], soulmate:6, element:'Luz universal', partner:'El 6 convierte tu amor universal en amor concreto, personal y nutritivo.' }
  };

  // ══════════════════════════════════════════
  // ARQUETIPOS MÍTICOS POR NÚMERO CAMINO DE VIDA
  // ══════════════════════════════════════════
  var ARCHETYPES_BY_LIFE_PATH = {
    1: { myth:'Prometeo', animal:'Águila', symbol:'La llama', mission:'Ser pionero. Cada idea que tengas puede cambiar el mundo si te atreves a encenderla.' },
    2: { myth:'Iris (mensajera)', animal:'Cisne', symbol:'El puente', mission:'Ser el puente. Tu don es unir lo que parecía irreconciliable; eres la paz.' },
    3: { myth:'Hermes Creador', animal:'Mariposa', symbol:'La pluma', mission:'Crear y comunicar. Tu misión es elevar el espíritu humano con tus palabras y arte.' },
    4: { myth:'Hefesto', animal:'Toro', symbol:'La columna', mission:'Construir lo duradero. Tu legado es aquello que permanece después de que todos se han ido.' },
    5: { myth:'Hermes Viajero', animal:'Zorro', symbol:'El viento', mission:'Explorar y liberar. Eres un catalizador del cambio; donde vas, las cosas se transforman.' },
    6: { myth:'Deméter', animal:'Paloma', symbol:'El hogar', mission:'Nutrir y sanar. Tu amor no es solo personal; es medicina colectiva para el mundo.' },
    7: { myth:'Atenea', animal:'Búho', symbol:'El espejo', mission:'Conocer y revelar la verdad. Tu mente es un templo; cuida bien lo que alojas en ella.' },
    8: { myth:'Zeus', animal:'León', symbol:'El cetro', mission:'Dominar con justicia. Tu poder es real; el reto es usarlo para elevar a todos los que te rodean.' },
    9: { myth:'Quetzalcóatl', animal:'Serpiente emplumada', symbol:'El círculo', mission:'Completar el ciclo y enseñar. Eres el maestro que libera lo que ya fue, para que nazca lo nuevo.' }
  };

  // ══════════════════════════════════════════
  // MOTOR PRINCIPAL
  // ══════════════════════════════════════════
  function normalize(str) {
    return (str || '').toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function lookupName(name) {
    var key = normalize(name);
    return NAMES_DB[key] || null;
  }

  function lookupSurname(surname) {
    var key = normalize(surname);
    return SURNAMES_DB[key] || null;
  }

  function calcVibration(text) {
    var map = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9, j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9, s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8 };
    var clean = normalize(text).replace(/[^a-z]/g, '');
    var sum = 0;
    for (var i = 0; i < clean.length; i++) sum += (map[clean[i]] || 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split('').reduce(function(a,d){ return a + Number(d); }, 0);
    }
    return sum;
  }

  function getCompatibility(lifePath) {
    return COMPATIBILITY[lifePath] || COMPATIBILITY[1];
  }

  function getArchetype(lifePath) {
    return ARCHETYPES_BY_LIFE_PATH[lifePath] || ARCHETYPES_BY_LIFE_PATH[1];
  }

  // Lectura genérica si el nombre no está en la DB
  function genericNameReading(name, vibration) {
    var elements = ['Fuego','Agua','Tierra','Aire','Éter','Fuego','Agua','Tierra','Aire'];
    var planets = ['Sol','Luna','Júpiter','Saturno','Marte','Venus','Mercurio','Urano','Neptuno'];
    var gems = ['Rubí','Perla','Citrino','Ónix','Granate','Rosa cuarzo','Lapislázuli','Amatista','Aguamarina'];
    var v = (vibration || 1) - 1;
    return {
      origin: 'Origen especial',
      meaning: 'Tu nombre porta una vibración única que escapa a las clasificaciones tradicionales. Eso te hace singular: eres una frecuencia que el cosmos nunca antes había combinado así.',
      element: elements[v],
      planet: planets[v],
      archetype: 'El Único',
      gem: gems[v],
      color: 'Multicolor iridiscente',
      isGeneric: true
    };
  }

  function genericSurnameReading(surname, vibration) {
    return {
      origin: 'Linaje singular',
      meaning: 'Tu apellido lleva la marca de un linaje que forjó su propia identidad fuera de los senderos comunes.',
      lineage: 'Los Forjadores de Destino',
      territory: 'Tu propio horizonte',
      isGeneric: true
    };
  }

  // Función principal de lectura completa
  function getFullReading(firstName, lastName, lifePath) {
    var nameVib = calcVibration(firstName);
    var surnameVib = calcVibration(lastName);
    var fullVib = calcVibration(firstName + ' ' + lastName);

    var nameData = lookupName(firstName) || genericNameReading(firstName, nameVib);
    var surnameData = lookupSurname(lastName) || genericSurnameReading(lastName, surnameVib);
    var compat = getCompatibility(lifePath || 1);
    var archetype = getArchetype(lifePath || 1);

    return {
      name: { text: firstName, data: nameData, vibration: nameVib },
      surname: { text: lastName, data: surnameData, vibration: surnameVib },
      full: { vibration: fullVib },
      compatibility: compat,
      archetype: archetype
    };
  }

  // API pública
  return {
    getFullReading: getFullReading,
    lookupName: lookupName,
    lookupSurname: lookupSurname,
    calcVibration: calcVibration,
    getCompatibility: getCompatibility,
    getArchetype: getArchetype
  };

})();

// life-planes.js — Motor de lecturas por los 6 Planos de Vida
// Mapa de Vida © 2026

window.LifePlanes = (function () {
  'use strict';

  // Bases de datos de lecturas por plano
  var READINGS = {
    salud: {
      1: "Tu vitalidad está regida por el Sol (Fuego). Tu principal área a cuidar es el corazón y la circulación. Eres propenso al agotamiento por exceso de actividad; necesitas aprender a delegar para no cargar tensión en la espalda alta.",
      2: "Tu energía está regida por la Luna (Agua). Eres somático: tus emociones impactan directamente tu estómago y sistema digestivo. El agua y los ambientes tranquilos son tu mejor medicina. Cuida tus riñones bebiendo suficiente agua.",
      3: "Tu vitalidad se asocia a Júpiter. Las áreas vulnerables son el hígado y los pulmones. Necesitas respirar, expresar lo que sientes y no guardarte palabras, ya que la garganta suele ser tu punto de tensión.",
      4: "Tu regente es Saturno (Tierra). Tu estructura ósea, dientes y articulaciones (especialmente rodillas) requieren atención. Eres de constitución fuerte pero rígida; ejercicios de flexibilidad como el yoga te son indispensables.",
      5: "Regido por Mercurio (Aire). Tu sistema nervioso es altamente activo y propenso al estrés o ansiedad. Necesitas movimiento constante pero también rutinas de desconexión digital para calmar tu mente hiperactiva.",
      6: "Regido por Venus. Eres sensible en el área del pecho, corazón y sistema reproductivo. Tu salud florece cuando estás en ambientes estéticamente armónicos y rodeado de afecto. El aislamiento marchita tu vitalidad.",
      7: "Tu regencia es de Neptuno/Urano. Tu sensibilidad es extrema; absorbes las energías del entorno. Necesitas retiros regulares y contacto con la naturaleza para limpiar tu campo áurico. Cuida tu sistema linfático.",
      8: "Bajo la influencia de Saturno/Marte. Eres de gran resistencia física pero puedes sufrir de estrés crónico que afecta tu sistema cardiovascular e intestinos. Aprender a soltar el control es tu mejor terapia de salud.",
      9: "Regido por Marte/Neptuno. Tienes una fuerte energía vital, pero tus emociones profundas pueden afectar tu sistema inmunológico. Aprende a poner límites compasivos para no drenar tu energía ayudando a otros."
    },
    prosperidad: {
      1: "Tu camino financiero es el del emprendedor. La abundancia llega cuando lideras, inicias proyectos y confías en tus propias ideas en lugar de seguir a otros. El riesgo calculado es tu mejor inversión.",
      2: "Tu prosperidad se construye en equipo. Las sociedades, asociaciones y roles de mediación son tu mina de oro. Atraes abundancia siendo diplomático y creando redes de apoyo mutuo, no compitiendo en solitario.",
      3: "Tus palabras y tu creatividad son tu moneda. La abundancia fluye hacia ti cuando te expresas, comunicas, vendes o creas arte. El pesimismo es tu mayor bloqueador financiero; mantén una mentalidad lúdica.",
      4: "La riqueza para ti es sinónimo de construcción sólida. Tu camino es lento pero seguro: bienes raíces, ahorros a largo plazo, sistemas estructurados. No confíes en 'hacerte rico rápido', tu magia está en la disciplina.",
      5: "Tu economía es dinámica y fluctuante. Haces dinero a través de las ventas, los viajes, la tecnología y adaptándote rápido a las tendencias. La clave es diversificar: no pongas todos tus recursos en un solo lugar.",
      6: "Tu abundancia está ligada a la belleza, el servicio y el hogar. Negocios relacionados con la sanación, la educación, la estética o la alimentación te son muy favorables. Ganas más cuando sientes que ayudas a otros.",
      7: "Tu mente analítica o tu profunda intuición son tu capital. Trabajos de investigación, esoterismo, ciencia o análisis de datos te traen recursos. Necesitas creer en tu propio valor intelectual para no cobrar menos de lo que mereces.",
      8: "Tienes la vibración del dinero y el poder material. Tu potencial para generar riqueza es inmenso, pero requiere dominar la administración y entender el equilibrio entre lo material y lo espiritual. Piensa en grande.",
      9: "El dinero fluye hacia ti cuando tu propósito es filantrópico o humanitario. Curiosamente, cuanto más te enfocas en el impacto global o en ayudar a grandes causas, más recursos materiales llegan a tus manos."
    },
    relaciones: {
      1: "En el amor, eres apasionado, protector y tiendes a dominar. Necesitas una pareja que admire tu fuerza pero que no se deje apagar por ella. Tu reto: aprender que ceder no es perder, sino amar.",
      2: "Naciste para estar en pareja. Eres el compañero ideal: empático, detallista y comprensivo. Tu mayor desafío es no perder tu propia identidad ni fusionarte tanto con el otro que olvides tus propias necesidades.",
      3: "Necesitas una pareja con la que puedas reír y hablar por horas. El aburrimiento es letal para tus relaciones. Buscas un compañero de juegos, alguien que estimule tu mente y celebre tu alegría de vivir.",
      4: "Expresas el amor a través de actos de servicio y lealtad. No eres de grandes poemas, pero construirás un hogar seguro. Necesitas alguien que valore tu constancia y que te ayude a ser menos rígido.",
      5: "Amas la libertad tanto como el romance. Tu pareja debe ser también tu cómplice de aventuras; alguien que no te ate. Si te sientes enjaulado, huirás. El amor para ti debe sentirse como un viaje emocionante.",
      6: "El amor es el centro de tu universo. Tiendes a idealizar a tus parejas y a dar demasiado, a veces cayendo en el rol de 'salvador'. Encuentra a alguien que te cuide a ti con la misma intensidad con la que tú cuidas.",
      7: "Eres un misterio en el amor. Necesitas mucho espacio personal y silencio, lo que a veces hace que tu pareja te sienta distante. Tu conexión debe ser primero intelectual y espiritual antes que física.",
      8: "Buscas a alguien a tu nivel: una 'pareja de poder'. Quieres a alguien a quien respetar profundamente, ambicioso y fuerte. Tu reto es no tratar la relación como si fuera una transacción o un negocio.",
      9: "Amas de manera universal y romántica. A veces amas más el 'concepto' del amor que a la persona real con sus defectos. Tu aprendizaje es bajar a la tierra y amar las imperfecciones de tu pareja."
    },
    proposito: { // Se basa en la vibración completa del nombre (fullVibration)
      1: "Tu misión álmica es abrir caminos. Has venido a romper viejos paradigmas, a ser punta de lanza y a enseñar a otros lo que significa la verdadera independencia y el coraje.",
      2: "Tu propósito es anclar la paz. Has venido a ser un puente entre opuestos, a sanar divisiones y a enseñar el poder de la vulnerabilidad y la receptividad en un mundo duro.",
      3: "Tu misión es elevar la vibración del mundo a través de la alegría y el arte. Has venido a recordar a la humanidad que la creatividad y la risa son herramientas espirituales de alto nivel.",
      4: "Tu propósito es ser el pilar. Has venido a estructurar el caos, a construir cimientos sólidos para las futuras generaciones y a demostrar el valor sagrado del trabajo honesto y la disciplina.",
      5: "Tu misión álmica es la liberación. Has venido a experimentar todo el espectro de la vida humana, rompiendo cadenas mentales y mostrando a otros cómo vivir sin miedos ni ataduras.",
      6: "Tu propósito es anclar el amor incondicional en la Tierra. Has venido a sanar, a nutrir, a crear belleza y a recordar que todos somos una gran familia cósmica.",
      7: "Tu misión es buscar la Verdad profunda. Has venido a descorrer el velo de la ilusión material, conectando el cielo y la tierra a través del conocimiento interior, la mística o la ciencia.",
      8: "Tu propósito es espiritualizar la materia. Has venido a demostrar que la abundancia y el poder no están reñidos con la luz, usando los recursos materiales para generar un impacto real y positivo.",
      9: "Tu misión álmica es la consumación. Eres un alma vieja que vino a cerrar ciclos karmicos, a soltar apegos y a enseñar el amor universal, perdonando y liberando el pasado."
    },
    vocacion: { // Se basa en Camino de Vida + Signo
      1: "Líder natural, director, emprendedor, inventor, productor. Funcionarás mejor siendo tu propio jefe o estando a cargo de un equipo. No soportas la microgestión.",
      2: "Psicólogo, diplomático, mediador, artista, sanador, consejero. Brillas donde se requiere tacto, negociación y un profundo entendimiento de la psicología humana.",
      3: "Comunicador, escritor, actor, diseñador, publicista, orador. Tu voz y tu visión estética son tus herramientas de trabajo. Necesitas un entorno dinámico y creativo.",
      4: "Arquitecto, ingeniero, administrador, programador, contable. Destacas donde se requiere orden, lógica, precisión y capacidad para materializar ideas abstractas.",
      5: "Periodista, guía de viajes, investigador, relaciones públicas, ventas. Tu vocación debe implicar movimiento, cambio, variedad y contacto con muchas personas diferentes.",
      6: "Médico, terapeuta, maestro, diseñador de interiores, chef. Toda profesión que implique cuidar de otros, embellecer el entorno o enseñar te dará profunda satisfacción.",
      7: "Científico, filósofo, investigador, analista de datos, esoterista. Tu mente aguda requiere resolver misterios y trabajar en entornos tranquilos donde puedas profundizar.",
      8: "CEO, banquero, juez, productor ejecutivo, inversor. Naciste para manejar grandes organizaciones, recursos y personas. Tu visión estratégica es tu mayor talento profesional.",
      9: "Filántropo, artista de impacto social, trabajador humanitario, sanador holístico. Tu vocación siempre estará ligada a dejar el mundo mejor de como lo encontraste."
    },
    familia: { // Se basa en Vibración de Apellido
      1: "En tu linaje, tú eres el iniciador de una nueva rama. Llevas la energía de 'romper maldiciones familiares' y hacer las cosas de forma completamente distinta a tus ancestros.",
      2: "Eres el pegamento de tu familia. Tu linaje te ha encomendado la tarea de sanar viejos conflictos y mantener unidos a los miembros a través de la empatía.",
      3: "Vienes a traer luz y sanación emocional a tu árbol genealógico. Tu linaje pudo haber sido duro o melancólico, y tu rol es reescribir la historia con optimismo.",
      4: "Tu papel familiar es ser el guardián de las tradiciones. Representas el pilar de apoyo práctico; eres a quien todos acuden cuando hay una crisis real que resolver.",
      5: "Eres la 'oveja negra' luminosa de tu familia. Tu linaje te empuja a viajar lejos (física o mentalmente) para oxigenar el árbol genealógico con ideas de otras culturas.",
      6: "Eres el patriarca o la matriarca natural, sin importar tu edad. Has heredado el don de crear hogar y refugio. La sanación de tu linaje materno es clave en tu vida.",
      7: "Eres el buscador espiritual de tu familia. Vienes a descifrar los secretos ocultos de tus ancestros y a darles un sentido trascendente. Sanas el árbol a través de la consciencia.",
      8: "Cargas con la encomienda de recuperar o multiplicar el estatus y la seguridad material de tu linaje. Sanas la relación ancestral con la carencia o el sacrificio.",
      9: "Eres el alma que viene a cerrar los karmas de todo tu árbol. Tu perdón y tu capacidad de soltar rencores familiares libera no solo tu futuro, sino el de tus ancestros."
    }
  };

  // Función para reducir un número a un dígito (1-9)
  function reduceToSingleDigit(num) {
    var sum = parseInt(num, 10);
    while (sum > 9) {
      sum = String(sum).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return sum;
  }

  // Generador de la lectura completa
  function generateReadings(params) {
    var lp = reduceToSingleDigit(params.lifePath || 1);
    var py = reduceToSingleDigit(params.personalYear || 1);
    var nameVib = reduceToSingleDigit(params.nameVibration || 1);
    var surnameVib = reduceToSingleDigit(params.surnameVibration || 1);
    var fullVib = reduceToSingleDigit(params.fullVibration || 1);

    return {
      salud: READINGS.salud[lp],
      prosperidad: READINGS.prosperidad[py], // Basado en el año personal (ciclos económicos)
      relaciones: READINGS.relaciones[lp],
      proposito: READINGS.proposito[fullVib], // Propósito total del nombre completo
      vocacion: READINGS.vocacion[nameVib], // Basado en el nombre propio (expresión)
      familia: READINGS.familia[surnameVib] // Basado en el apellido (linaje)
    };
  }

  return {
    generate: generateReadings
  };
})();

export const destinationsData = {
  "punta-cana": {
    id: "punta-cana",
    name: "Punta Cana",
    region: "República Dominicana",
    img: "/destinations/punta-cana/banner.jpg",
    airlines: [
      { name: "Avianca", route: "BOG ➔ PUJ", type: "Vuelo Directo", img: "/destinations/punta-cana/avianca.jpg" },
      { name: "Copa Airlines", route: "BGA ➔ PTY ➔ PUJ", type: "1 Escala", img: "/destinations/punta-cana/copa.jpg" },
      { name: "Wingo", route: "BOG ➔ PUJ", type: "Vuelo Directo", img: "/destinations/punta-cana/wingo.jpg" }
    ],
    hotels: [
      { name: "Hard Rock Hotel & Casino", rating: "5 Estrellas", desc: "Todo incluido, lujo y entretenimiento sin fin.", img: "/destinations/punta-cana/hardrock.jpg" },
      { name: "Barceló Bávaro Palace", rating: "5 Estrellas", desc: "Frente a una de las mejores playas del mundo.", img: "/destinations/punta-cana/barcelo-bavaro.jpg" },
      { name: "Riu Republica", rating: "Solo Adultos", desc: "Ideal para parejas y grupos de amigos.", img: "/destinations/punta-cana/riu-republica.jpg" }
    ],
    extras: [
      { icon: "fa-bus", title: "Traslados al Aeropuerto", desc: "Ida y vuelta en transporte privado o compartido.", img: "/destinations/punta-cana/traslados.jpg" },
      { icon: "fa-briefcase-medical", title: "Asistencia Médica Turística", desc: "Cobertura completa durante toda tu estancia.", img: "/destinations/punta-cana/asistencia-medica.jpg" },
      { icon: "fa-ticket", title: "Tour Isla Saona", desc: "Excursión de un día en catamarán con almuerzo y bebidas.", img: "/destinations/punta-cana/saona.jpg" }
    ]
  },
  "europa": {
    id: "europa",
    name: "Europa",
    region: "Internacionales",
    img: "/destinations/europa/banner.jpg",
    airlines: [
      { name: "Avianca", route: "BOG ➔ MAD / LHR", type: "Vuelo Directo", img: "/destinations/europa/avianca.jpg" },
      { name: "Iberia", route: "BOG ➔ MAD", type: "Vuelo Directo", img: "/destinations/europa/iberia.jpg" },
      { name: "Air Europa", route: "BOG ➔ MAD", type: "Vuelo Directo", img: "/destinations/europa/air-europa.jpg" }
    ],
    hotels: [
      { name: "Meliá Madrid Princesa", rating: "5 Estrellas", desc: "Elegancia en el corazón de Madrid.", img: "/destinations/europa/melia-madrid.jpg" },
      { name: "Ibis Paris Tour Eiffel", rating: "3 Estrellas", desc: "Ubicación céntrica con vistas impresionantes.", img: "/destinations/europa/ibis-paris.jpg" },
      { name: "NH Collection Roma Centro", rating: "4 Estrellas", desc: "Comodidad cerca de los principales monumentos de Roma.", img: "/destinations/europa/nh-roma.jpg" }
    ],
    extras: [
      { icon: "fa-train", title: "Eurail Pass", desc: "Pases de tren para moverte por toda Europa libremente.", img: "/destinations/europa/eurail.jpg" },
      { icon: "fa-briefcase-medical", title: "Seguro Schengen", desc: "Requisito obligatorio, con nuestra agencia está garantizado.", img: "/destinations/europa/schengen.jpg" },
      { icon: "fa-map-marked-alt", title: "City Tours Guiados", desc: "Tours en español por las principales capitales europeas.", img: "/destinations/europa/city-tours.jpg" }
    ]
  },
  "cartagena": {
    id: "cartagena",
    name: "Cartagena",
    region: "Costa Caribe",
    img: "/destinations/cartagena/banner.jpg",
    airlines: [
      { name: "Avianca", route: "BGA ➔ CTG / BOG ➔ CTG", type: "Directo / 1 Escala", img: "/destinations/cartagena/avianca.jpg" },
      { name: "LATAM", route: "BOG ➔ CTG", type: "Vuelo Directo", img: "/destinations/cartagena/latam.jpg" },
      { name: "Wingo", route: "BOG ➔ CTG", type: "Vuelo Directo", img: "/destinations/cartagena/wingo.jpg" }
    ],
    hotels: [
      { name: "Hotel Estelar Cartagena de Indias", rating: "5 Estrellas", desc: "Excelentes vistas y comodidades premium.", img: "/destinations/cartagena/estelar.jpg" },
      { name: "Decameron Cartagena", rating: "Todo Incluido", desc: "Diversión asegurada en Bocagrande.", img: "/destinations/cartagena/decameron.jpg" },
      { name: "Hotel Santa Clara", rating: "Lujo Histórico", desc: "Vive la historia dentro de la ciudad amurallada.", img: "/destinations/cartagena/santa-clara.jpg" }
    ],
    extras: [
      { icon: "fa-bus", title: "Traslados Hotel-Aeropuerto", desc: "Movilidad segura desde que llegas de tu vuelo.", img: "/destinations/cartagena/traslados.jpg" },
      { icon: "fa-ship", title: "Tour Islas del Rosario", desc: "Día completo en un resort exclusivo en las islas.", img: "/destinations/cartagena/rosario.jpg" },
      { icon: "fa-utensils", title: "Tour Gastronómico", desc: "Descubre los sabores locales del Caribe colombiano.", img: "/destinations/cartagena/gastronomia.jpg" }
    ]
  },
  "san-andres": {
    id: "san-andres",
    name: "San Andrés & Providencia",
    region: "Caribe Colombiano",
    img: "/destinations/san-andres/banner.jpg",
    airlines: [
      { name: "LATAM", route: "BOG ➔ ADZ", type: "Vuelo Directo", img: "/destinations/san-andres/latam.jpg" },
      { name: "Avianca", route: "BOG ➔ ADZ", type: "Vuelo Directo", img: "/destinations/san-andres/avianca.jpg" },
      { name: "Wingo", route: "BOG ➔ ADZ", type: "Vuelo Directo", img: "/destinations/san-andres/wingo.jpg" }
    ],
    hotels: [
      { name: "Decameron Isleño", rating: "Todo Incluido", desc: "En la mejor zona de San Andrés, frente a Spratt Bight.", img: "/destinations/san-andres/decameron-isleno.jpg" },
      { name: "Hotel Casablanca", rating: "4 Estrellas", desc: "Excelente ubicación y vistas al mar de siete colores.", img: "/destinations/san-andres/casablanca.jpg" },
      { name: "Solaris Hotel", rating: "Hospedaje Boutique", desc: "Tranquilidad y exclusividad.", img: "/destinations/san-andres/solaris.jpg" }
    ],
    extras: [
      { icon: "fa-ship", title: "Vuelta a la isla en lancha", desc: "Visita Johny Cay y el Acuario.", img: "/destinations/san-andres/vuelta-isla.jpg" },
      { icon: "fa-motorcycle", title: "Alquiler de Mulita/Carrito", desc: "Recorre la vía circunvalar a tu ritmo.", img: "/destinations/san-andres/mulita.jpg" },
      { icon: "fa-id-card", title: "Tarjeta de Turismo", desc: "Trámite de la tarjeta OCCRE facilitado por nosotros.", img: "/destinations/san-andres/occre.jpg" }
    ]
  },
  "mexico": {
    id: "mexico",
    name: "Mexico",
    region: "Historia y Espiritualidad",
    img: "/destinations/mexico/banner.jpg",
    airlines: [
      { name: "Aeroméxico", route: "BOG ➔ MEX", type: "Vuelo Directo", img: "/destinations/mexico/aeromexico.jpg" },
      { name: "Avianca", route: "BOG ➔ MEX / CUN", type: "Vuelo Directo", img: "/destinations/mexico/avianca.jpg" },
      { name: "Volaris", route: "BOG ➔ MEX / CUN", type: "Vuelo Directo", img: "/destinations/mexico/volaris.jpg" }
    ],
    hotels: [
      { name: "Hotel Riu Plaza Guadalajara", rating: "4 Estrellas", desc: "Ideal para estancias urbanas.", img: "/destinations/mexico/riu-guadalajara.jpg" },
      { name: "Xcaret Arte", rating: "All-Fun Inclusive", desc: "Lo mejor de la Riviera Maya con entradas a los parques.", img: "/destinations/mexico/xcaret-arte.jpg" },
      { name: "Barceló Maya Grand Resort", rating: "Todo Incluido", desc: "Instalaciones espectaculares frente al Caribe.", img: "/destinations/mexico/barcelo-maya.jpg" }
    ],
    extras: [
      { icon: "fa-monument", title: "Tour Chichén Itzá", desc: "Maravilla del mundo con guía especializado.", img: "/destinations/mexico/chichen-itza.jpg" },
      { icon: "fa-bus", title: "Traslados Completos", desc: "Movilidad aeropuerto-hotel-atracciones cubierta.", img: "/destinations/mexico/traslados.jpg" },
      { icon: "fa-briefcase-medical", title: "Seguro Médico", desc: "Viaja seguro con cobertura médica amplia.", img: "/destinations/mexico/seguro.jpg" }
    ]
  }
};

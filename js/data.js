export const destinationsData = {
  "punta-cana": {
    id: "punta-cana",
    name: "Punta Cana",
    region: "República Dominicana",
    img: "/destino-punta-cana.jpg",
    airlines: [
      { name: "Avianca", route: "BOG ➔ PUJ", type: "Vuelo Directo" },
      { name: "Copa Airlines", route: "BGA ➔ PTY ➔ PUJ", type: "1 Escala" },
      { name: "Wingo", route: "BOG ➔ PUJ", type: "Vuelo Directo" }
    ],
    hotels: [
      { name: "Hard Rock Hotel & Casino", rating: "5 Estrellas", desc: "Todo incluido, lujo y entretenimiento sin fin." },
      { name: "Barceló Bávaro Palace", rating: "5 Estrellas", desc: "Frente a una de las mejores playas del mundo." },
      { name: "Riu Republica", rating: "Solo Adultos", desc: "Ideal para parejas y grupos de amigos." }
    ],
    extras: [
      { icon: "fa-bus", title: "Traslados al Aeropuerto", desc: "Ida y vuelta en transporte privado o compartido." },
      { icon: "fa-briefcase-medical", title: "Asistencia Médica Turística", desc: "Cobertura completa durante toda tu estancia." },
      { icon: "fa-ticket", title: "Tour Isla Saona", desc: "Excursión de un día en catamarán con almuerzo y bebidas." }
    ]
  },
  "europa": {
    id: "europa",
    name: "Europa",
    region: "Internacionales",
    img: "/destino-europa.jpg",
    airlines: [
      { name: "Avianca", route: "BOG ➔ MAD / LHR", type: "Vuelo Directo" },
      { name: "Iberia", route: "BOG ➔ MAD", type: "Vuelo Directo" },
      { name: "Air Europa", route: "BOG ➔ MAD", type: "Vuelo Directo" }
    ],
    hotels: [
      { name: "Meliá Madrid Princesa", rating: "5 Estrellas", desc: "Elegancia en el corazón de Madrid." },
      { name: "Ibis Paris Tour Eiffel", rating: "3 Estrellas", desc: "Ubicación céntrica con vistas impresionantes." },
      { name: "NH Collection Roma Centro", rating: "4 Estrellas", desc: "Comodidad cerca de los principales monumentos de Roma." }
    ],
    extras: [
      { icon: "fa-train", title: "Eurail Pass", desc: "Pases de tren para moverte por toda Europa libremente." },
      { icon: "fa-briefcase-medical", title: "Seguro Schengen", desc: "Requisito obligatorio, con nuestra agencia está garantizado." },
      { icon: "fa-map-marked-alt", title: "City Tours Guiados", desc: "Tours en español por las principales capitales europeas." }
    ]
  },
  "cartagena": {
    id: "cartagena",
    name: "Cartagena",
    region: "Costa Caribe",
    img: "/destino-cartagena.jpg",
    airlines: [
      { name: "Avianca", route: "BGA ➔ CTG / BOG ➔ CTG", type: "Directo / 1 Escala" },
      { name: "LATAM", route: "BOG ➔ CTG", type: "Vuelo Directo" },
      { name: "Wingo", route: "BOG ➔ CTG", type: "Vuelo Directo" }
    ],
    hotels: [
      { name: "Hotel Estelar Cartagena de Indias", rating: "5 Estrellas", desc: "Excelentes vistas y comodidades premium." },
      { name: "Decameron Cartagena", rating: "Todo Incluido", desc: "Diversión asegurada en Bocagrande." },
      { name: "Hotel Santa Clara", rating: "Lujo Histórico", desc: "Vive la historia dentro de la ciudad amurallada." }
    ],
    extras: [
      { icon: "fa-bus", title: "Traslados Hotel-Aeropuerto", desc: "Movilidad segura desde que llegas de tu vuelo." },
      { icon: "fa-ship", title: "Tour Islas del Rosario", desc: "Día completo en un resort exclusivo en las islas." },
      { icon: "fa-utensils", title: "Tour Gastronómico", desc: "Descubre los sabores locales del Caribe colombiano." }
    ]
  },
  "san-andres": {
    id: "san-andres",
    name: "San Andrés & Providencia",
    region: "Caribe Colombiano",
    img: "/destino-san-andres.jpg",
    airlines: [
      { name: "LATAM", route: "BOG ➔ ADZ", type: "Vuelo Directo" },
      { name: "Avianca", route: "BOG ➔ ADZ", type: "Vuelo Directo" },
      { name: "Wingo", route: "BOG ➔ ADZ", type: "Vuelo Directo" }
    ],
    hotels: [
      { name: "Decameron Isleño", rating: "Todo Incluido", desc: "En la mejor zona de San Andrés, frente a Spratt Bight." },
      { name: "Hotel Casablanca", rating: "4 Estrellas", desc: "Excelente ubicación y vistas al mar de siete colores." },
      { name: "Solaris Hotel", rating: "Hospedaje Boutique", desc: "Tranquilidad y exclusividad." }
    ],
    extras: [
      { icon: "fa-ship", title: "Vuelta a la isla en lancha", desc: "Visita Johny Cay y el Acuario." },
      { icon: "fa-motorcycle", title: "Alquiler de Mulita/Carrito", desc: "Recorre la vía circunvalar a tu ritmo." },
      { icon: "fa-id-card", title: "Tarjeta de Turismo", desc: "Trámite de la tarjeta OCCRE facilitado por nosotros." }
    ]
  },
  "mexico": {
    id: "mexico",
    name: "Mexico",
    region: "Historia y Espiritualidad",
    img: "/destino-mexico.jpg",
    airlines: [
      { name: "Aeroméxico", route: "BOG ➔ MEX", type: "Vuelo Directo" },
      { name: "Avianca", route: "BOG ➔ MEX / CUN", type: "Vuelo Directo" },
      { name: "Volaris", route: "BOG ➔ MEX / CUN", type: "Vuelo Directo" }
    ],
    hotels: [
      { name: "Hotel Riu Plaza Guadalajara", rating: "4 Estrellas", desc: "Ideal para estancias urbanas." },
      { name: "Xcaret Arte", rating: "All-Fun Inclusive", desc: "Lo mejor de la Riviera Maya con entradas a los parques." },
      { name: "Barceló Maya Grand Resort", rating: "Todo Incluido", desc: "Instalaciones espectaculares frente al Caribe." }
    ],
    extras: [
      { icon: "fa-monument", title: "Tour Chichén Itzá", desc: "Maravilla del mundo con guía especializado." },
      { icon: "fa-bus", title: "Traslados Completos", desc: "Movilidad aeropuerto-hotel-atracciones cubierta." },
      { icon: "fa-briefcase-medical", title: "Seguro Médico", desc: "Viaja seguro con cobertura médica amplia." }
    ]
  }
};

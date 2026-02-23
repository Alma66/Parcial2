// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Crear 2 Admins
  const adminHash1 = await bcrypt.hash('Admin1', 10);
  const admin1 = await prisma.admin.upsert({
    where: { number: 12345 },
    update: {},
    create: {
      name: 'AdminUno',
      apellido: 'Test',
      number: 12345,
      passwordHash: adminHash1  // Corregido: era AdminTest1
    }
  });

  const adminHash2 = await bcrypt.hash('Admin2', 10);
  const admin2 = await prisma.admin.upsert({
    where: { number: 67890 },
    update: {},
    create: {
      name: 'AdminDos',
      apellido: 'Test',
      number: 67890,
      passwordHash: adminHash2  // Corregido: era AdminTest2
    }
  });

  // Crear 2 Users
  const userHash1 = await bcrypt.hash('User1', 10);
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@gmail.com' },
    update: {},
    create: {
      name: 'UsuarioUno',
      email: 'user1@gmail.com',
      passwordHash: userHash1  // Corregido: era UserTest1
    }
  });

  const userHash2 = await bcrypt.hash('User2', 10);
  const user2 = await prisma.user.upsert({
    where: { email: 'user2@gmail.com' },
    update: {},
    create: {
      name: 'UsuarioDos',
      email: 'user2@gmail.com',
      passwordHash: userHash2  // Corregido: era UserTest2
    }
  });

  // Crear 2 Categories
  const category1 = await prisma.category.upsert({
    where: { name: 'Aros' },
    update: {},
    create: { name: 'Aros' }
  });

  const category2 = await prisma.category.upsert({
    where: { name: 'Anillos' },
    update: {},
    create: { name: 'Anillos' }
  });

  const category3 = await prisma.category.upsert({
    where: { name: 'Pulseras' },
    update: {},
    create: { name: 'Pulseras' }
  });

  const category4 = await prisma.category.upsert({
    where: { name: 'Collares' },
    update: {},
    create: { name: 'Collares' }
  });

  // Crear 2 Products (con imageUrl de ejemplo)
 // Crear productos (11 productos)
const product1 = await prisma.product.upsert({
  where: { id: 1 },
  update: {},
  create: {
    name: 'Neelam de Provence',
    description: 'Aretes geométricos en oro, con zafiros azules intensos, rubíes y diamantes blancos, trabajados en una composición de líneas limpias y contrastes profundos. Inspirados en los tonos nocturnos de los palacios indios y en la arquitectura refinada del sur de Francia, estos aretes fusionan fuerza cromática y sofisticación estructural. Un homenaje a la dualidad cultural: pasión oriental y sobriedad europea.\n\nMateriales:\n• Oro amarillo 18k\n• Zafiros azules (≈ 5.40 ct total)\n• Rubíes (≈ 1.10 ct total)\n• Diamantes blancos (≈ 1.80 ct total)',
    price: 5500.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/1.png',
    stockQuantity: 2,
    categoryId: category1.id
  }
});

const product2 = await prisma.product.upsert({
  where: { id: 2 },
  update: {},
  create: {
    name: 'Meenakshi d’Or',
    description: 'Aretes escultóricos en oro blanco y amarillo, protagonizados por zafiros azules talla lágrima y diamantes blancos, con acentos dorados que realzan la profundidad de la gema central. La inspiración nace en los templos del sur de la India y en la tradición joyera ceremonial, reinterpretada con el rigor y la pureza formal de la alta joyería francesa. Una pieza majestuosa que encarna devoción, herencia y poder femenino.\n\nMateriales:\n• Oro blanco y amarillo 18k\n• Zafiros azules (≈ 7.80 ct total)\n• Diamantes blancos (≈ 3.40 ct total)',
    price: 7200.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/2.png',
    stockQuantity: 1,
    categoryId: category1.id
  }
});

const product3 = await prisma.product.upsert({
  where: { id: 3 },
  update: {},
  create: {
    name: 'Aviva d’Émeraude',
    description: 'Aretes de alta joyería en oro amarillo, engastados con esmeraldas talla lágrima y diamantes blancos talla brillante. El diseño combina filigrana inspirada en la joyería tradicional india con una composición refinada de raíz parisina. La silueta y el colgante tipo jhumka evocan ceremonias del norte de la India, mientras que el equilibrio y la simetría responden a la estética franco-judía clásica. Una pieza que celebra la vida y la elegancia atemporal.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas naturales (≈ 6.20 ct total)\n• Diamantes blancos (≈ 2.10 ct total)',
    price: 6800.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/3.png',
    stockQuantity: 3,
    categoryId: category1.id
  }
});

const product4 = await prisma.product.upsert({
  where: { id: 4 },
  update: {},
  create: {
    name: 'Talia Jaipur',
    description: 'Aretes en oro amarillo, centrados por un diamante facetado y rodeados por placas triangulares de topacio/turmalina azul con acentos de rubí y tsavorita. El diseño combina la geometría simbólica y la sobriedad franco-judía con la simetría mandálica y el detalle artesanal de la tradición india; el engaste micro y la caída móvil equilibran referencia ritual y refinamiento parisino. Una pieza que celebra la unión de herencias y elegancia atemporal.\n\nMateriales:\n• Oro amarillo 18k\n• Diamante central (≈ 1.10 ct total)\n• Turmalinas / topacios azules (≈ 4.00 ct total)\n• Rubíes (≈ 1.60 ct total)\n• Tsavoritas y diamantes pequeños (≈ 1.20 ct total)',
    price: 8500.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/4.png',
    stockQuantity: 2,
    categoryId: category1.id
  }
});

const product5 = await prisma.product.upsert({
  where: { id: 5 },
  update: {},
  create: {
    name: 'Seraphine Ben-Ami',
    description: 'Aretes de alta joyería en oro rosa y amarillo con gemas centrales aqua en corte óvalo y lágrima, rodeadas por pétalos de zafiro, amatista y diamantes en pavé. El lenguaje formal fusiona la profusión cromática y las guirnaldas ceremoniales de la joyería india con la pulcritud y el acabado refinado de la casa parisina; el resultado es una silueta floral y elegante pensada para la ceremonia. Una pieza femenina, luminosa y de presencia ceremonial.\n\nMateriales:\n• Oro 18k (rosa/amarillo)\n• Turmalinas / topacios aqua (gemas centrales ≈ 6.00 ct total)\n• Zafiros, amatistas y piedras de colores (≈ 3.50 ct total)\n• Diamantes blancos pequeños (≈ 1.60 ct total)',
    price: 9500.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/5.png',
    stockQuantity: 1,
    categoryId: category1.id
  }
});

const product6 = await prisma.product.upsert({
  where: { id: 6 },
  update: {},
  create: {
    name: 'Nava de Jaipur',
    description: 'Aretes escultóricos en oro amarillo con esmeraldas cabujón centrales, halo de rubíes y diamantes y estructura estelar hexagonal. Inspirados en la geometría sagrada y los emblemas estelares de la tradición franco-judía, reinterpretados con la riqueza cromática y el oficio ceremonial de los talleres indios; engaste preciso y colgante móvil aportan nobleza y movimiento. Una pieza majestuosa que encarna la tradición, devoción y elegancia.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas cabujón (≈ 4.80 ct total)\n• Rubíes (≈ 1.80 ct total)\n• Diamantes blancos pequeños (≈ 0.90 ct total)',
    price: 7800.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/6.png',
    stockQuantity: 2,
    categoryId: category1.id
  }
});

const product7 = await prisma.product.upsert({
  where: { id: 7 },
  update: {},
  create: {
    name: 'Yara Saphira',
    description: 'Aretes en oro amarillo, protagonizados por zafiros azules talla lágrima y halo de diamantes blancos, rematados con motivos foliares engastados en diamante. El diseño articula la pureza estructural y la sobriedad parisina con la ornamentación y el cromatismo ceremonial indio, resultando en una pieza de gran impacto escénico y equilibrio compositivo. Una declaración de lujo atemporal, pensada para la noche y la ceremonia.\n\nMateriales:\n• Oro amarillo 18k\n• Zafiros azules talla lágrima (≈ 8.50 ct total)\n• Diamantes blancos (halo y acentos ≈ 3.20 ct total)',
    price: 11000.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/7.png',
    stockQuantity: 1,
    categoryId: category1.id
  }
});

const product8 = await prisma.product.upsert({
  where: { id: 8 },
  update: {},
  create: {
    name: 'Meera d’Étoile',
    description: 'Aretes en oro amarillo, engastados con zafiros azules talla lágrima y halo de diamantes blancos talla brillante; la pieza remata en un colgante gota que aporta caída y nobleza. El diseño fusiona la filigrana y la profusión decorativa de la tradición india - evocando jhumkas y guirnaldas ceremoniales - con la sobriedad compositiva y el savoir-faire parisino de raíz franco-judía. Una joya ceremonial y atemporal pensada para la noche y los grandes momentos.\n\nMateriales:\n• Oro amarillo 18k\n• Zafiros azules (talla lágrima ≈ 7.00 ct, complementos ≈ 1.80 ct total)\n• Diamantes blancos (halo y acentos ≈ 2.10 ct total)',
    price: 9200.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/8.png',
    stockQuantity: 3,
    categoryId: category1.id
  }
});

const product9 = await prisma.product.upsert({
  where: { id: 9 },
  update: {},
  create: {
    name: 'Cécile de Saphir',
    description: 'Aretes jhumka en oro amarillo, protagonizados por zafiros azul intenso talla lágrima y un halo de diamantes blancos, rematados por una campana esmaltada y borlas de perla natural. La pieza combina la profusión y el movimiento de la tradición jhumka india con la proporción y el pulido de la alta joyería franco-judía. Hecho a mano con engaste micro y pequeño trabajo de esmalte.\n\nMateriales:\n• Oro amarillo 18k\n• Zafiros azules (central ≈ 6.5 ct, complementos ≈ 5.0 ct total)\n• Diamantes blancos pequeños (≈ 1.8 ct total)\n• Perlas cultivadas (≈ 12–14 pequeñas)',
    price: 10500.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/9.png',
    stockQuantity: 2,
    categoryId: category1.id
  }
});

const product10 = await prisma.product.upsert({
  where: { id: 10 },
  update: {},
  create: {
    name: 'Indira Lévy',
    description: 'Pendientes chandelier en oro amarillo con rubí central talla lágrima, halo de diamantes y pétalos de esmeraldas y pequeñas rubíes; rematan con perlas colgantes en gota. Diseño que fusiona la devoción y el ornamento ceremonial del sur de la India con la limpieza compositiva y la finura de la tradición joyera parisina. Engaste altamente manual y caída pensada para movimiento noble.\n\nMateriales:\n• Oro amarillo 18k (acabado pulido)\n• Rubí central (≈ 7.0 ct total)\n• Esmeraldas y rubíes pequeños (≈ 2.2 ct total)\n• Diamantes blancos pavé (≈ 3.0 ct total)\n• Perlas cultivadas (≈ 8 gotas)',
    price: 12500.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/10.png',
    stockQuantity: 1,
    categoryId: category1.id
  }
});

const product11 = await prisma.product.upsert({
  where: { id: 11 },
  update: {},
  create: {
    name: 'Rivka Émeraude',
    description: 'Aretes jhumka en oro amarillo con esmeralda central talla lágrima, pétalos de esmeraldas y rubíes alrededor, rematada por pequeñas bolitas doradas colgantes. Pieza que celebra la riqueza cromática y el oficio del subcontinente indio reinterpretada con la sobriedad y el acabado de la esfera franco-judía; ideal para ceremonia y alfombra roja. Trabajo artesanal con engaste tipo kundan y micro-granulado en los bordes; las perlas colgantes aportan movimiento y un remate barroco que realza la caída.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas (talla lágrima ≈ 4.20 ct, pétalos ≈ 3.30 ct)\n• Rubíes en pétalos (≈ 2.00 ct total)\n• Diamantes blancos pavé (≈ 3.20 ct total)\n• Perlas cultivadas (≈ 8 gotas)',
    price: 8800.00,
    imageUrl: 'http://localhost:5000/uploads/products/aros/11.png',
    stockQuantity: 2,
    categoryId: category1.id
  }
});

// Crear productos (Anillos - categoryId: category2.id)
const product12 = await prisma.product.upsert({
  where: { id: 12 },
  update: {},
  create: {
    name: 'Aviva Rubis d’Inde',
    description: 'Anillo en oro amarillo, protagonizado por una turmalina central rodeada de microengastes multicolor que alternan esmeraldas, zafiros turquesa y pequeñas amatistas. El trabajo de filigrana y la profusión de pequeñas cabujones recuerdan los talleres ceremoniales del subcontinente, mientras que la proporción y la corona geométrica responden a la pureza de la tradición parisina-franco-judía; pieza hecha a mano, de fuerte presencia escénica.\n\nMateriales:\n• Oro amarillo 18k\n• Turmalina (gema central ≈ 6.5 ct)\n• Esmeraldas, zafiros turquesa, amatistas y gemas de colores (≈ 4.2 ct total)\n• Diamantes blancos pavé (≈ 0.9 ct)',
    price: 6200.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/1.png',
    stockQuantity: 2,
    categoryId: category2.id
  }
});

const product13 = await prisma.product.upsert({
  where: { id: 13 },
  update: {},
  create: {
    name: 'Cécile de Saphir',
    description: 'Anillo de estilo regio en oro amarillo que incorpora un zafiro central azul profundo montado en una corona de diamantes y pequeños zafiros; los laterales muestran arabescos calados y microengaste que evocan tanto la elegancia parisina como los motivos palaciegos de la India. Pieza concebida para impacto visual, trabajada a mano con engaste preciso.\n\nMateriales:\n• Oro amarillo 18k\n• Zafiro azul central (≈ 8.0 ct)\n• Diamantes blancos (≈ 2.0 ct total)\n• Zafiros menores y elementos calados (≈ 1.5 ct)',
    price: 7800.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/2.png',
    stockQuantity: 1,
    categoryId: category2.id
  }
});

const product14 = await prisma.product.upsert({
  where: { id: 14 },
  update: {},
  create: {
    name: 'Leela Mirabai',
    description: 'Anillo maxicoronado en oro rosado con composición en relieve: turmalina central rojiza bajo engaste de garras, acompañada por esmeraldas en talla pera y múltiples rubíes y diamantes en distintas tallas. El conjunto mezcla la profusión ornamental y el colorido ritual de la joyería india con la estructura y el acabado pulido propio de la alta relojería/joyería europea; manufactura totalmente artesanal.\n\nMateriales:\n• Oro rosado 18k\n• Turmalina rojiza (gema central ≈ 5.5 ct)\n• Esmeraldas acentos (≈ 1.2 ct)\n• Rubíes y diamantes pequeños (≈ 3.6 ct total)',
    price: 9200.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/3.png',
    stockQuantity: 3,
    categoryId: category2.id
  }
});

const product15 = await prisma.product.upsert({
  where: { id: 15 },
  update: {},
  create: {
    name: 'Aviva Raj',
    description: 'Pieza escultórica en oro amarillo con un eje central policromático (ópalo) y un halo radial de micro-ornamentos que sugieren una estética solar ceremonial. La pieza conjuga motivos estelares y filigrana inspirados en la devoción del subcontinente con la discreta simetría y acabado francés-parisino; montaje hecho a mano con trabajo de microengaste y esmaltes puntuales.\n\nMateriales:\n• Oro amarillo 18k\n• Opalo (gema central ≈ 4.5 ct)\n• Esmeraldas pequeñas, rubíes y diamantes de acento (≈ 2.8 ct total)',
    price: 7100.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/4.png',
    stockQuantity: 2,
    categoryId: category2.id
  }
});

const product16 = await prisma.product.upsert({
  where: { id: 16 },
  update: {},
  create: {
    name: 'Rivka Blanc',
    description: 'Anillo en oro amarillo de lectura más sobria y contemporánea, con gema central incolora-pálida (corte oval) de diamante, y banda decorada con pequeños topacios en disposición orgánica. Equilibra el pulido y la contención francesa con pequeños acentos artesanales de inspiración india; perfecto como pieza de firma para uso diario y ocasiones.\n\nMateriales:\n• Oro amarillo 18k\n• Diamante Champagne (gema central ≈ 3.8 ct)\n• Topacios pequeños (≈ 1.1 ct total)',
    price: 5800.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/5.png',
    stockQuantity: 1,
    categoryId: category2.id
  }
});

const product17 = await prisma.product.upsert({
  where: { id: 17 },
  update: {},
  create: {
    name: 'Zohar Étoile',
    description: 'Anillo escultórico en oro amarillo con una entidad central cristalina en corte brillante, rodeada por una geometría hexagonal y una corona de pequeños topacios grisáceos. La pieza combina la precisión compositiva de la tradición franco-judía con la filigrana y el relieve ceremonial inspirados en los talleres indios; fabricación artesanal y engaste micro.\n\nMateriales:\n• Oro amarillo 18k\n• Diamante blanco (gema central ≈ 4.5 ct)\n• Topacios/grises y diamantes pequeños (≈ 2.0 ct total)',
    price: 6500.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/6.png',
    stockQuantity: 2,
    categoryId: category2.id
  }
});

const product18 = await prisma.product.upsert({
  where: { id: 18 },
  update: {},
  create: {
    name: 'Roshni d\'Éclat',
    description: 'Anillo en oro amarillo, protagonizado por una gema de espinela rosa, rodeada por esmeraldas y micro-diamantes en halo. Trabajo de filigrana, micro-granulado y engaste tipo kundan que combina la riqueza cromática y el detalle ceremonial de la tradición india con la elegancia y sobriedad de la orfebrería franco-judía. Pieza hecha a mano; inspirado en los palacios mogoles y la sensibilidad parisina de taller.\n\nMateriales:\n• Oro amarillo 18k\n• Espinela rosa central (≈ 7 ct)\n• Esmeraldas (≈ 2.5 ct total)\n• Diamantes pequeños pavé (≈ 1.0 ct total)',
    price: 8900.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/7.png',
    stockQuantity: 1,
    categoryId: category2.id
  }
});

const product19 = await prisma.product.upsert({
  where: { id: 19 },
  update: {},
  create: {
    name: 'Miriam d’Améthyste',
    description: 'Anillo maxicoronado en oro amarillo, con amatista central y una corona estelar de gota y corazón en garras, rematado por calados y motivos vegetales. Diseño que amalgama la iconografía estelar y devocional de la India con la geometría y el savoir-faire franco-judío; engastes a mano y acabado punteado. Evoca el reencuentro de ritual y elegancia.\n\nMateriales:\n• Oro amarillo 18k\n• Amatista central (≈ 6.5 ct)\n• Zafiros rosas pequeños (≈ 3.0 ct total)',
    price: 7600.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/8.png',
    stockQuantity: 3,
    categoryId: category2.id
  }
});

const product20 = await prisma.product.upsert({
  where: { id: 20 },
  update: {},
  create: {
    name: 'Elara Ben-Or',
    description: 'Anillo escudo en oro amarillo con gema central de esmeralda, corona de cabujones turquesa y pequeños diamantes, y acentos esmaltados. El relieve y la profusión de medallones y círculos recuerdan los escudos ceremoniales del subcontinente; la proporción y el pulido evocan el acabado de la tradición joyera parisina. Pieza de fuerte presencia, trabajada a mano con micro-engaste.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeralda (≈ 6 ct)\n• Cabujones turquesa y gemas menores (≈ 2.8 ct)\n• Diamantes pequeños pavé (≈ 1.0 ct)',
    price: 8200.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/9.png',
    stockQuantity: 2,
    categoryId: category2.id
  }
});

const product21 = await prisma.product.upsert({
  where: { id: 21 },
  update: {},
  create: {
    name: 'Asha Lumière',
    description: 'Anillo con gran corona circular de filigrana en oro amarillo y un diamante central rodeado por rosas de diamantes talla antigua y motivos calados. Acabado de esmaltes puntuales y micro-engastes que remiten a mandalas ceremoniales y a la ornamentación sinfónica de la joyería parisina; manufactura totalmente artesanal. Inspiración: la unión entre la devoción ritual india y la pureza compositiva de la casa franco-judía.\n\nMateriales:\n• Oro amarillo 18k\n• Diamante central (≈ 5.5 ct)\n• Diamantes pequeños (≈ 2.5 ct total)',
    price: 10500.00,
    imageUrl: 'http://localhost:5000/uploads/products/anillos/10.png',
    stockQuantity: 1,
    categoryId: category2.id
  }
});

// Crear productos (Pulseras - categoryId: category3.id)
const product22 = await prisma.product.upsert({
  where: { id: 22 },
  update: {},
  create: {
    name: 'Éliane Neelam',
    description: 'Brazalete rígido en oro amarillo con cabujones nacarados y microengaste de diamantes blancos en halo. Diseño de corte neoclásico con pequeños motivos florales en relieve que fusionan la filigrana ceremonial india con la sobriedad refinada de la alta casa parisina.\n\nMateriales:\n• Oro amarillo 18k\n• Nácar y cabujones blancos (≈ 10.0 ct total)\n• Diamantes blancos pavé (≈ 1.2 ct total)',
    price: 4500.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/1.png',
    stockQuantity: 3,
    categoryId: category3.id
  }
});

const product23 = await prisma.product.upsert({
  where: { id: 23 },
  update: {},
  create: {
    name: 'Mireille Kundan',
    description: 'Pulsera de filigrana calada en oro amarillo, con motivos geométricos y una gota central colgante engastada en diamante. Trabajo minucioso de micro-engaste que mezcla el detalle kundan del subcontinente con la simplicidad estructural de la joyería parisina.\n\nMateriales:\n• Oro amarillo 18k\n• Diamante central (≈ 1.1 ct)\n• Diamantes pequeños pavé (≈ 1.0 ct total)',
    price: 5200.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/2.png',
    stockQuantity: 2,
    categoryId: category3.id
  }
});

const product24 = await prisma.product.upsert({
  where: { id: 24 },
  update: {},
  create: {
    name: 'Jasmin Étoile',
    description: 'Brazalete ancho de inspiración palaciega, montado en oro amarillo con medallones policromos: esmeraldas, aguamarinas y rubíes alternados, rodeados por halos de diamantes. Evoca los tesoros de la corte india reinterpretados con proporciones y pulido de la tradición franco-judía.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas y aguamarinas (≈ 6.5 ct total)\n• Rubíes y microdiamantes (≈ 2.5 ct total)',
    price: 6800.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/3.png',
    stockQuantity: 1,
    categoryId: category3.id
  }
});

const product25 = await prisma.product.upsert({
  where: { id: 25 },
  update: {},
  create: {
    name: 'Léonie Raj',
    description: 'Brazalete semicirculado con perfil fino y doble hilera de diamantes en oro amarillo 18k; la simetría y el pulido recuerdan la elegancia parisina mientras los motivos en gablete remiten a los arquetipos ceremoniales indios. Pieza pensada para brillo diario y ocasiones formales.\n\nMateriales:\n• Oro amarillo 18k\n• Diamantes blancos (≈ 3.8 ct total)',
    price: 5900.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/4.png',
    stockQuantity: 4,
    categoryId: category3.id
  }
});

const product26 = await prisma.product.upsert({
  where: { id: 26 },
  update: {},
  create: {
    name: 'Yaël de Chand',
    description: 'Pulsera ancha tipo brazalete rígido con ornamentación en alto relieve y cabujones policromos (turquesa, lapislázuli y granate). Trabajo artesanal intensivo con micro-granulado y esmaltes puntuales; convive la exuberancia ritual india con el savoir-faire de la alta joyería europea.\n\nMateriales:\n• Oro amarillo 18k\n• Turquesas, lapislázuli y granates (≈ 10.0 ct total)\n• Diamantes pequeños (≈ 1.8 ct total)',
    price: 7500.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/5.png',
    stockQuantity: 2,
    categoryId: category3.id
  }
});

const product27 = await prisma.product.upsert({
  where: { id: 27 },
  update: {},
  create: {
    name: 'Ishani Rousseau',
    description: 'Brazalete rígido de aire palaciego en oro amarillo, profusamente engastado con cabujones verdes (esmeraldas y turquesas) y halo de diamantes pequeños en micro-engaste. Pieza manufacturada a mano con trabajo de filigrana y micro-granulado; presencia colores: verdes profundos y acentos azules.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas y turquesas (cabujones ≈ 8.0 ct total)\n• Diamantes blancos pavé (≈ 2.2 ct total)',
    price: 8200.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/6.png',
    stockQuantity: 1,
    categoryId: category3.id
  }
});

const product28 = await prisma.product.upsert({
  where: { id: 28 },
  update: {},
  create: {
    name: 'Camille Indira',
    description: 'Pulsera ancha tipo brazalete con medallones policromos y relieve en alto; alterna cabujones redondos y cortes facetados con halos de diamantes. Trabajo artesanal con esmaltes puntuales y micro-engastes que aportan textura y profundidad.\n\nMateriales:\n• Oro amarillo 18k\n• Cabujones esmaltados y zafiros/ágatas (≈ 7.5 ct total)\n• Diamantes pequeños (halo y acentos) ≈ 2.0 ct total',
    price: 7100.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/7.png',
    stockQuantity: 3,
    categoryId: category3.id
  }
});

const product29 = await prisma.product.upsert({
  where: { id: 29 },
  update: {},
  create: {
    name: 'Asha de Valois',
    description: 'Brazalete de gran volumen con corona de cabujones verdes facetados y ornamentación en relieve finamente calada; remate interior pulido y acabados de lujo. Pieza de fuerte presencia escénica, concebida para alfombra roja y ceremonias.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas y ágatas (cabujones ≈ 9.0 ct total)\n• Diamantes blancos (micro-pavé en relieves ≈ 2.8 ct total)',
    price: 9500.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/8.png',
    stockQuantity: 1,
    categoryId: category3.id
  }
});

const product30 = await prisma.product.upsert({
  where: { id: 30 },
  update: {},
  create: {
    name: 'Roshni de Sion',
    description: 'Pulsera ligera y delicada con fileteado de filigrana, medallones de diamante antiguo y pequeños cabujones de color; acabado etéreo con detalles calados que aligeran la pieza. Ideal como brazalete de firma para ocasiones elegantes y rituales.\n\nMateriales:\n• Oro amarillo 18k\n• Diamantes antiguos y pequeños (≈ 3.0 ct total)\n• Agatas y zafiros menores (≈ 1.5 ct total)',
    price: 4800.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/9.png',
    stockQuantity: 4,
    categoryId: category3.id
  }
});

const product31 = await prisma.product.upsert({
  where: { id: 31 },
  update: {},
  create: {
    name: 'Anouk Kaur',
    description: 'Brazalete rígido en oro amarillo de inspiración palaciega: cabujones verdes y granates policromos se disponen sobre una rica filigrana y motivos calados, rematados por micro-diamantes que iluminan el relieve. Pieza hecha a mano con técnica de micro-engaste y granulado, que fusiona la profusión ornamental y los colores rituales del subcontinente indio con la proporción, la sobriedad y el oficio de la tradición joyera franco-judía.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas (≈ 6.0 ct total)\n• Amatistas (≈ 3.0 ct total)\n• Diamantes blancos micro-pavé (≈ 1.0–1.5 ct total)',
    price: 8800.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/10.png',
    stockQuantity: 2,
    categoryId: category3.id
  }
});

const product32 = await prisma.product.upsert({
  where: { id: 32 },
  update: {},
  create: {
    name: 'Anouk Kaur',
    description: 'Brazalete rígido en oro amarillo de inspiración palaciega: cabujones verdes y granates policromos se disponen sobre una rica filigrana y motivos calados, rematados por micro-diamantes que iluminan el relieve. Pieza hecha a mano con técnica de micro-engaste y granulado, que fusiona la profusión ornamental y los colores rituales del subcontinente indio con la proporción, la sobriedad y el oficio de la tradición joyera franco-judía.\n\nMateriales:\n• Oro amarillo 18k\n• Esmeraldas (≈ 6.0 ct total)\n• Amatistas (≈ 3.0 ct total)\n• Diamantes blancos micro-pavé (≈ 1.0–1.5 ct total)',
    price: 8800.00,
    imageUrl: 'http://localhost:5000/uploads/products/pulseras/10.png',
    stockQuantity: 2,
    categoryId: category3.id
  }
});


  

  

  console.log('Seed completado: 2 ejemplos por tabla agregados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
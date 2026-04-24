import type { Booking, ConfirmationState } from '../types/booking';

const CITY_COUNTRY_MAP: Record<string, string[]> = {
  France: [
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Nantes',
    'Strasbourg',
    'Bordeaux',
  ],
  'United Kingdom': [
    'London',
    'Manchester',
    'Birmingham',
    'Leeds',
    'Glasgow',
    'Liverpool',
    'Bristol',
    'Edinburgh',
  ],
  Germany: [
    'Berlin',
    'Munich',
    'Frankfurt',
    'Hamburg',
    'Cologne',
    'Düsseldorf',
    'Stuttgart',
    'Nuremberg',
    'Dresden',
    'Leipzig',
    'Hanover',
  ],
  Netherlands: [
    'Amsterdam',
    'Rotterdam',
    'The Hague',
    'Utrecht',
    'Groningen',
    'Antwerp',
    'Eindhoven',
    'Arnhem',
  ],
  Spain: [
    'Barcelona',
    'Madrid',
    'Valencia',
    'Seville',
    'Bilbao',
    'Málaga',
    'Alicante',
    'Granada',
  ],
  Italy: [
    'Rome',
    'Milan',
    'Venice',
    'Florence',
    'Naples',
    'Turin',
    'Genoa',
    'Bologna',
  ],
  Austria: ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt'],
  'Czech Republic': [
    'Prague',
    'Brno',
    'Ostrava',
    'Plzeň',
    'Liberec',
    'Olomouc',
  ],
  Hungary: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs', 'Győr'],
  Sweden: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro'],
  Denmark: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers'],
  Ireland: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Drogheda'],
  Greece: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos'],
  Portugal: ['Lisbon', 'Porto', 'Braga', 'Covilhã', 'Faro', 'Covilhã'],
  Poland: [
    'Warsaw',
    'Krakow',
    'Gdańsk',
    'Wrocław',
    'Poznań',
    'Łódź',
    'Białystok',
  ],
  Romania: [
    'Bucharest',
    'Cluj-Napoca',
    'Timișoara',
    'Iași',
    'Constanța',
    'Brașov',
  ],
  Bulgaria: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'Stara Zagora'],
  Serbia: ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Prizren'],
  Croatia: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar', 'Pula'],
  Slovenia: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Novo Mesto', 'Velenje'],
  Slovakia: [
    'Bratislava',
    'Košice',
    'Prešov',
    'Žilina',
    'Banská Bystrica',
    'Nitra',
  ],
  Switzerland: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne'],
  Belgium: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges'],
  Luxembourg: [
    'Luxembourg City',
    'Esch-sur-Alzette',
    'Differdange',
    'Dudelange',
  ],
  Finland: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Turku', 'Oulu'],
  Norway: [
    'Oslo',
    'Bergen',
    'Trondheim',
    'Stavanger',
    'Kristiansand',
    'Tromsø',
  ],
  Iceland: [
    'Reykjavik',
    'Kópavogur',
    'Hafnarfjörður',
    'Akureyri',
    'Vífilsstöður',
  ],
};

const NAMES = [
  'John Doe',
  'Jane Smith',
  'Bob Johnson',
  'Alice Williams',
  'Charlie Brown',
  'Diana Prince',
  'Ethan Hunt',
  'Fiona Green',
  'George White',
  'Helen Black',
  'Ian Miller',
  'Julia Roberts',
  'Kevin Hart',
  'Laura Palmer',
  'Michael Scott',
  'Nancy Drew',
  'Oscar Wilde',
  'Patricia Lee',
  'Quincy Adams',
  'Rachel Green',
  'Steve Rogers',
  'Tina Turner',
  'Ulysses Grant',
  'Vera Lynn',
  'Walter White',
  'Xander Harris',
  'Yara Shahidi',
  'Zoe Saldana',
  'Aaron Paul',
  'Bella Swan',
  'Casey Jones',
  'Dakota Johnson',
  'Evan Peters',
  'Frida Kahlo',
  'Gal Gadot',
  'Hedy Lamarr',
  'Iris West',
  'Jack Sparrow',
  'Katniss Everdeen',
  'Liam Neeson',
  'Miranda Kerr',
  'Natalie Portman',
  'Olivia Wilde',
  'Penelope Cruz',
  'Quinn Fabray',
  'Ryan Gosling',
  'Scarlett Johansson',
  'Tom Hanks',
  'Uma Thurman',
  'Viggo Mortensen',
];

const CONFIRMATION_STATES: ConfirmationState[] = [
  'confirmed',
  'pending',
  'cancelled',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(daysInFuture: number = 365): string {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysInFuture);
  const date = new Date(now.getTime() + randomDays * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0];
}

function generateMockBookings(count: number): Booking[] {
  const bookings: Booking[] = [];
  const countries = Object.keys(CITY_COUNTRY_MAP);

  for (let i = 0; i < count; i++) {
    const country = getRandomElement(countries);
    const cities = CITY_COUNTRY_MAP[country];
    const city = getRandomElement(cities);

    const dateFrom = getRandomDate(365);
    const dateToDate = new Date(
      new Date(dateFrom).getTime() +
        Math.floor(Math.random() * 20 + 1) * 24 * 60 * 60 * 1000
    );
    const dateTo = dateToDate.toISOString().split('T')[0];

    bookings.push({
      id: `${i + 1}`,
      dateFrom,
      dateTo,
      city,
      country,
      name: getRandomElement(NAMES),
      confirmationState: getRandomElement(CONFIRMATION_STATES),
    });
  }

  return bookings;
}

export const mockBookings: Booking[] = generateMockBookings(1000);

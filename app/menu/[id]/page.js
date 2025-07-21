import MenuItemDetail from './MenuItemDetail';

export async function generateStaticParams() {
  return [
    { id: 'bruschetta' },
    { id: 'antipasto' },
    { id: 'calamari' },
    { id: 'caprese' },
    { id: 'pasta-carbonara' },
    { id: 'penne-arrabbiata' },
    { id: 'fettuccine-alfredo' },
    { id: 'lasagna' },
    { id: 'margherita-pizza' },
    { id: 'quattro-stagioni' },
    { id: 'prosciutto-pizza' },
    { id: 'diavola-pizza' },
    { id: 'osso-buco' },
    { id: 'chicken-parmigiana' },
    { id: 'salmon-piccata' },
    { id: 'veal-marsala' },
    { id: 'tiramisu' },
    { id: 'panna-cotta' },
    { id: 'cannoli' },
    { id: 'gelato' },
    { id: 'wine-selection' },
    { id: 'espresso' },
    { id: 'limoncello' },
    { id: 'italian-soda' }
  ];
}

export default function MenuItemPage({ params }: { params: { id: string } }) {
  return <MenuItemDetail itemId={params.id} />;
}
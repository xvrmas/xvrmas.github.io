//Genera números aleatoris

export function generarSorteig()
{
  const numeros = [];
  while (numeros.length < 6)
  {
    const n = Math.floor(Math.random() * 49) + 1;
    if (!numeros.includes(n)) numeros.push(n);
  }
  return numeros;
}

document.addEventListener('DOMContentLoaded', () =>
{
  const botoToggle = document.getElementById('boto-toggle-loteria');
  const blocLoteria = document.getElementById('bloc-loteria');
  const botoTancar = document.getElementById('boto-tancar-loteria');
  const botoToggleHistorial = document.getElementById('boto-toggle-historial');
  const historial = document.getElementById('historial');
  if (!botoToggle || !blocLoteria) return;

  const DURACIO_ANIMACIO_MS = 240;

  function obrirModal()
  {
    blocLoteria.classList.remove('ocult-loteria');
    window.requestAnimationFrame(() =>
    {
      blocLoteria.classList.add('is-visible');
    });
  }

  function tancarModal()
  {
    blocLoteria.classList.remove('is-visible');
    window.setTimeout(() =>
    {
      blocLoteria.classList.add('ocult-loteria');
    }, DURACIO_ANIMACIO_MS);
  }

  botoToggle.addEventListener('click', () =>
  {
    obrirModal();
  });

  if (botoTancar) botoTancar.addEventListener('click', tancarModal);

  blocLoteria.addEventListener('click', (e) =>
  {
    if (e.target === blocLoteria) tancarModal();
  });

  document.addEventListener('keydown', (e) =>
  {
    if (e.key === 'Escape' && blocLoteria.classList.contains('is-visible')) tancarModal();
  });

  if (botoToggleHistorial && historial)
  {
    botoToggleHistorial.addEventListener('click', () =>
    {
      historial.classList.toggle('ocult-historial');
      const visible = !historial.classList.contains('ocult-historial');
      botoToggleHistorial.textContent = visible ? 'Amagar historial' : 'Mostrar historial';
    });
  }
});

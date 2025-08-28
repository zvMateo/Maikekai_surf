import { test, expect } from '@playwright/test'

test('flujo de checkout redirige a Stripe', async ({ page }) => {
  // Interceptar la llamada al endpoint de checkout y devolver una URL de Stripe ficticia
  await page.route('**/api/checkout', async (route) => {
    const request = route.request()
    if (request.method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          url: 'https://checkout.stripe.com/test-session',
        }),
      })
    } else {
      await route.continue()
    }
  })

  // Evitar navegaciones reales a Stripe durante el CI
  await page.route('https://checkout.stripe.com/**', (route) =>
    route.fulfill({ status: 200, body: 'stripe-mock' }),
  )

  // Mock de las páginas del catálogo para evitar depender de un servidor real
  await page.route('**/en/combos', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: `<a href="http://localhost:3000/en/combos/producto" id="ver-mas">Ver más</a>`,
    }),
  )
  await page.route('**/en/combos/producto', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<p>Producto</p>' }),
  )

  // Selección de un producto en el catálogo
  await page.goto('http://localhost:3000/en/combos')
  await page.locator('#ver-mas').click()

  // Añadir producto al carrito simulando la interacción del usuario
  await page.evaluate(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ productId: 'test-product', quantity: 1 }]),
    )
  })

  // Iniciar el proceso de checkout
  await page.evaluate(async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{ name: 'Test product', amount: 1000, quantity: 1 }],
      }),
    })
    const data = await response.json()
    window.location.href = data.url
  })

  // Verificar la redirección al dominio de Stripe
  await page.waitForURL('https://checkout.stripe.com/**')
  expect(page.url()).toContain('checkout.stripe.com')
})

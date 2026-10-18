const { test, expect } = require('@playwright/test');

async function loadHomePage(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#project')).toBeAttached({ timeout: 20000 });
}

test.describe('About section', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomePage(page);
    await expect(
      page.locator('#about').getByRole('heading', { name: 'About' })
    ).toBeVisible();
  });

  test('renders section heading', async ({ page }) => {
    await expect(page.locator('#about').getByRole('heading', { name: 'About' })).toBeVisible();
  });

  test('renders internship entry with title and org', async ({ page }) => {
    await expect(page.getByText('Frontend Developer Intern')).toBeVisible();
    await expect(page.getByText('Fulcrum Resources Infinity Pvt. Ltd., Pune')).toBeVisible();
  });

  test('renders education entry with title and org', async ({ page }) => {
    await expect(page.getByText('B.E. Computer Engineering')).toBeVisible();
    await expect(page.getByText('Zeal College of Engineering and Research, Pune')).toBeVisible();
  });

  test('renders all 3 development focus roles', async ({ page }) => {
    const rolesList = page.locator('#about').getByRole('list', { name: 'Development focus' });
    await expect(rolesList.getByText('Frontend Development')).toBeVisible();
    await expect(rolesList.getByText('Full-Stack Development')).toBeVisible();
    await expect(rolesList.getByText('MERN Stack Development')).toBeVisible();
  });
});

test.describe('Projects section', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomePage(page);
    await expect(
      page.locator('#project').getByRole('heading', { name: /projects/i })
    ).toBeVisible();
  });

  test('renders "Projects" heading', async ({ page }) => {
    await expect(
      page.locator('#project').getByRole('heading', { name: /projects/i })
    ).toBeVisible();
  });

  test('EDMS card is visible with correct live link', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'EDMS' })).toBeVisible();
    const liveLink = page.getByRole('link', { name: 'EDMS live demo' });
    await expect(liveLink).toBeVisible();
    await expect(liveLink).toHaveAttribute('href', 'https://dmanager-hp.vercel.app/');
    await expect(liveLink).toHaveAttribute('target', '_blank');
    await expect(liveLink).toHaveAttribute('rel', /noopener noreferrer/);
  });

  test('DevMetrics card is visible with npm link', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'DevMetrics' })).toBeVisible();
    const npmLink = page.getByRole('link', { name: 'DevMetrics on npm' });
    await expect(npmLink).toBeVisible();
    await expect(npmLink).toHaveAttribute('href', 'https://www.npmjs.com/package/devmetrics-sdk');
  });

  test('"How I built it" expands and collapses', async ({ page }) => {
    const edmsArticle = page.locator('#project article').filter({
      has: page.getByRole('heading', { name: 'EDMS' }),
    });
    const toggleBtn = edmsArticle.getByRole('button', {
      name: /^(how i built it|hide details)$/i,
    });
    await expect(toggleBtn).toBeVisible();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(toggleBtn).toHaveText(/hide details/i);

    await toggleBtn.click();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(toggleBtn).toHaveText(/how i built it/i);
  });

  test('"View all repositories" link points to correct GitHub', async ({ page }) => {
    const repoLink = page.getByRole('link', { name: /view all repositories/i });
    await expect(repoLink).toHaveAttribute('href', 'https://github.com/developer8HARSHAL');
    await expect(repoLink).toHaveAttribute('target', '_blank');
    await expect(repoLink).toHaveAttribute('rel', /noopener noreferrer/);
  });
});

test.describe('Skills section', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomePage(page);
    await expect(
      page.locator('#skill').getByRole('heading', { name: /skills/i })
    ).toBeVisible();
  });

  test('renders "Skills" heading', async ({ page }) => {
    await expect(
      page.locator('#skill').getByRole('heading', { name: /skills/i })
    ).toBeVisible();
  });

  test('renders exactly 4 category headings', async ({ page }) => {
    await expect(page.locator('#skill h3')).toHaveCount(4);
  });

  test('all 4 category headings are visible', async ({ page }) => {
    for (const name of ['Frontend', 'Backend', 'Databases', 'Languages & fundamentals']) {
      await expect(page.locator('#skill h3').filter({ hasText: name })).toBeVisible();
    }
  });

  test('key skill tags are visible', async ({ page }) => {
    for (const skill of ['React.js', 'Node.js', 'JavaScript']) {
      await expect(
        page.locator('#skill').getByText(skill, { exact: true }).first()
      ).toBeVisible();
    }
  });
});
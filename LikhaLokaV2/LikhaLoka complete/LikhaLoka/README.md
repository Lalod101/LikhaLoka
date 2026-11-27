# LikhaLoka — modular website

A responsive student website using HTML, CSS, and plain JavaScript. HTML pages, CSS styles, and JavaScript are divided by functionality. Open `dist/index.html` to start.

## Run without installing extensions

1. Extract the ZIP.
2. Open the extracted folder in VS Code.
3. Open `dist/index.html` in Chrome or Edge. You can right-click the `dist` folder, choose Open in Integrated Terminal, and run `start .\index.html` in Windows PowerShell.
4. Save edits in VS Code, then refresh the browser.

The browser loads every connected JavaScript file automatically. Keep the folders together. Each script uses a function wrapper to keep its variables private and shares its public functions through `window.LikhaLoka`. The `defer` scripts in `index.html` load in their listed order. This structure works without JavaScript import/export or a build step.

If you already have Python, you can also run `python -m http.server 5500 --directory dist` and open http://localhost:5500. Live Server is optional.

## Functionality modules

| File | Responsibility |
| --- | --- |
| `dist/js/sample-data.js` | Starter products, artisan profiles, and empty inquiry list |
| `dist/js/storage.js` | Reading and saving browser data, storage errors, cross-tab reload support |
| `dist/js/ui.js` | Shared dialogs, notices, text escaping, image paths, unavailable-page display |
| `dist/js/catalog.js` | Craft cards, public product listing, search, category filters, sorting, product details |
| `dist/js/artisans.js` | Artisan directory, maker search, profiles, and related crafts |
| `dist/js/inquiries.js` | Contact page, craft inquiry forms, validation, saving, admin inquiry details and status |
| `dist/js/pages.js` | Homepage and Our Story content |
| `dist/js/admin.js` | Admin demo access, workspace, product and artisan CRUD, search and delete confirmation |
| `dist/js/navigation.js` | URL routes, mobile menu, active links, page titles, refresh after changes in another tab |
| `dist/js/main.js` | Entry point that initializes the modules and opens the current page |
| `dist/index.html` | Homepage layout and featured collection |
| `dist/products.html` | Product catalog, search, and filters |
| `dist/product.html` | Individual craft page, populated from the selected product ID |
| `dist/artisans.html` | Artisan directory and search |
| `dist/artisan.html` | Individual artisan page, populated from the selected artisan ID |
| `dist/about.html` | Our Story content |
| `dist/contact.html` | General inquiry form |
| `dist/admin.html` | Admin demo entry and management workspace |
| `dist/css/base.css` | Brand colors, fonts, element defaults, and accessibility |
| `dist/css/layout.css` | Navigation, footer, shared grids, and page spacing |
| `dist/css/components.css` | Shared buttons, form controls, dialogs, and notifications |
| `dist/css/home.css` | Homepage hero, categories, and story sections |
| `dist/css/products.css` | Craft cards, filters, and product detail layout |
| `dist/css/artisans.css` | Maker cards and profile layouts |
| `dist/css/contact.css` | Inquiry form panels and field columns |
| `dist/css/admin.css` | Admin workspace, tables, and demo entry |
| `dist/css/about.css` | Our Story typography and content width |
| `dist/css/responsive.css` | Phone/tablet layouts and reduced-motion rules |
| `dist/assets/` | Bundled illustrative images |

## How the modules cooperate

Each HTML file contains its page structure and loads the shared styles and scripts. Dynamic records, detail views, and admin controls are populated by JavaScript. `main.js` starts the modules. `navigation.js` reads the HTML page identifier and any selected record ID. Normal links open the matching HTML file. Earlier hash links redirect to the corresponding HTML page. Feature modules render their own screens, use `ui.js` for shared display helpers, and use `storage.js` for records. For example, the catalog opens a craft and displays the inquiry form from `inquiries.js`. A saved inquiry then appears in the admin workspace.

## Demo behavior and limitations

- Open Admin demo from the footer to manage products, artisans, and inquiries.
- There is no real authentication. Use sample information.
- Data is stored in localStorage in the current browser and origin. There is no shared database or email delivery.
- The storage key `likhaloka-demo-v1` is retained so existing saved data on the same origin remains readable.
- Private browsing, blocked storage, or full storage can prevent saving.
- A draft product stays hidden from the public catalog.
- Reassign an artisan's linked products before deleting their profile.
- Products, artisan names, stories, and generated images are illustrative.
- System fonts are used when Google Fonts cannot load.

/* =====================================================================
   CONTENT FILE: edit ONLY this file to update the text of the website.
   The look of the website lives in style.css and the code in app.js.

   HOW TO EDIT
   - Keep the structure: quotes "..." or `...`, commas between items, brackets [ ] and braces { }.
   - Long texts are written between backticks `like this`, so you can use any quotes inside them
     and even write on several lines.
   - Inside texts you may use simple HTML, for example a link:
       <a href="https://example.com">name</a>      and italics:  <em>Journal Name</em>
   - To HIDE a whole section, set   show: false   in it.
   - To ADD an item (a paper, a course, a talk...), copy one { ... }, paste it next to it
     (with a comma between them) and edit the text.
   - Files like cv.pdf, photo.jpg or papers/jmp.pdf must be uploaded next to index.html
     with exactly the same names.
   ===================================================================== */

window.SITE = {

  /* ---------- Page information (browser tab, Google, link previews) ---------- */
  meta: {
    title: "Francisco Santinelli | PhD Candidate in Finance, UC3M",
    description: "Francisco Santinelli is a PhD candidate in Finance at Universidad Carlos III de Madrid. Research in [your fields].",
    url: "https://www.fsantine.com",
    sameAs: ["https://orcid.org/0009-0005-5126-2304"]      /* profiles that Google may link to you */
  },

  /* ---------- Top of the page ---------- */
  name: "Francisco Santinelli",
  initials: "FS",                      /* shown if photo.jpg is missing */
  role: "PhD Candidate in Finance",
  photo: "photo.jpg",

  university: {
    name: "Universidad Carlos III de Madrid",
    shortName: "UC3M",                 /* shown in a blue badge if the logo file is missing */
    url: "https://www.uc3m.es",
    logo: "logo-uc3m.png",
    caption: `Finance · Department of Business Administration<br>Universidad Carlos III de Madrid`
  },

  intro: `I am a PhD candidate in Finance at the Department of Business Administration, Universidad Carlos III de Madrid (UC3M).
          My research studies [your fields, e.g. asset pricing / corporate finance], with a focus on [your topic].`,

  heroButtons: [
    { label: "Download CV", url: "cv.pdf", primary: true }
  ],

  /* ---------- Menu label for the top of the page ---------- */
  homeLabel: "Home",

  /* ---------- About ---------- */
  about: {
    show: true,
    menu: "About",
    title: "About",
    paragraphs: [
      `Short academic bio: your background, your main research question in one or two sentences,
       and what you want to understand. Mention visiting positions if any.`
    ],
    advisorsLabel: "Advisors",
    advisors: [
      { name: "Prof. Advisor One", url: "https://example.com" },
      { name: "Prof. Advisor Two", url: "https://example.com" }
    ],
    advisorsSuffix: "(UC3M)",
    fieldsLabel: "Research fields",
    fields: ["[Field one]", "[Field two]", "[Field three]"],
    educationLabel: "Education",
    education: [
      { when: "[20XX – present]", text: "PhD in [Business Administration and Quantitative Methods / Finance], Universidad Carlos III de Madrid" },
      { when: "[20XX – 20XX]",    text: "MSc in [Finance / Economics], [University]" },
      { when: "[20XX – 20XX]",    text: "BSc in [Economics / Business], [University]" }
    ]
  },

  /* ---------- Research ---------- */
  research: {
    show: true,
    menu: "Research",
    title: "Research",
    groups: [
      {
        heading: "Job Market Paper",
        papers: [
          {
            title: "Title of Your Job Market Paper",
            badge: "JMP",
            meta: "Single-authored",
            links: [
              { label: "PDF",    url: "papers/jmp.pdf" },
              { label: "SSRN",   url: "https://papers.ssrn.com/" },
              { label: "Slides", url: "slides/jmp-slides.pdf" }
            ],
            abstract: `Paste the abstract here: question, data and method, main finding, contribution.`
          }
        ]
      },
      {
        heading: "Working Papers",
        papers: [
          {
            title: "Title of Working Paper One",
            meta: `with <a href="https://example.com">Coauthor Name</a>`,
            links: [
              { label: "PDF",  url: "papers/paper1.pdf" },
              { label: "SSRN", url: "https://papers.ssrn.com/" }
            ],
            abstract: `Abstract text.`
          }
        ]
      },
      {
        heading: "Work in Progress",
        papers: [
          { title: "Title of Project in Progress", meta: "with Coauthor Name" }
        ]
      }

      /* OPTIONAL: Publications. Remove the comment markers and add a comma after the group above.
      ,{
        heading: "Publications",
        papers: [
          {
            title: "Paper Title",
            meta: `with Coauthor. <em>Journal Name</em>, 2026, 81(2), 123–160.`,
            links: [ { label: "PDF", url: "papers/published1.pdf" }, { label: "DOI", url: "https://doi.org/..." } ]
          }
        ]
      }
      */
    ]
  },

  /* ---------- Teaching ---------- */
  teaching: {
    show: true,
    menu: "Teaching",
    title: "Teaching",
    items: [
      { when: "[2025 – 2026]", text: "<strong>Teaching Assistant</strong>, [Course name], UC3M" },
      { when: "[2024 – 2025]", text: "<strong>Teaching Assistant</strong>, [Course name], UC3M" }
    ]
  },

  /* ---------- Talks & Awards ---------- */
  talks: {
    show: true,
    menu: "Talks",
    title: "Talks & Awards",
    groups: [
      {
        heading: "Presentations",
        items: [
          { when: "[2026]", text: "[Conference or seminar], [City]" },
          { when: "[2025]", text: "[Conference or seminar], [City]" }
        ]
      },
      {
        heading: "Awards & Grants",
        items: [
          { when: "[20XX]", text: "[Award or fellowship], [Institution]" }
        ]
      }
    ]
  },

  /* ---------- CV ---------- */
  cv: {
    show: true,
    menu: "CV",
    title: "Curriculum Vitae",
    text: "My full CV is available as a PDF.",
    updated: "[Month Year]",
    button: "Download CV (PDF)",
    file: "cv.pdf"
  },

  /* ---------- Contact ---------- */
  contact: {
    show: true,
    menu: "Contact",
    title: "Contact",
    email: "fsantine@emp.uc3m.es",
    office: "Room [X.X.XX], Department of Business Administration, Universidad Carlos III de Madrid, C/ Madrid 126, 28903 Getafe, Spain",
    links: [
      { label: "ORCID",    url: "https://orcid.org/0009-0005-5126-2304" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/yourprofile" },
      { label: "GitHub",   url: "https://github.com/yourusername" }
    ]
  },

  /* ---------- Footer (the year is added automatically) ---------- */
  footer: "Francisco Santinelli · Universidad Carlos III de Madrid"
};

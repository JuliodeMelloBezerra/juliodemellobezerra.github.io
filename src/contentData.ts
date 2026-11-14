/**
 * ============================================================================
 * PORTFOLIO & CV CONTENT CONFIGURATION (`src/contentData.ts`)
 * ============================================================================
 *
 * HOW TO UPDATE THIS WEBSITE EASILY:
 *
 * 1. UPDATING YOUR PROFESSIONAL OR ACADEMIC CV:
 *    - Replace `./assets/CV.pdf` or `./assets/Academic_CV.pdf` inside `public/assets/`.
 *    - Edit any section inside `cvs.professional` or `cvs.academic` below to
 *      update the web HTML rendering.
 *
 * 2. EDITING OR ADDING ARTICLES:
 *    - Edit the `articles` list below. External articles have `external: true`
 *      and open their `href` directly. Internal articles open within the site.
 *    - Set `category` to `'cryptography'`, `'math'`, or `'general'`. Any category
 *      with at least one article automatically appears on the home page.
 * ============================================================================
 */

export interface CvBulletItem {
  label?: string;
  text: string;
}

export interface CvExperienceEntry {
  organization: string;
  role: string;
  period: string;
  location: string;
  bullets: CvBulletItem[];
}

export type CvSection =
  | {
      type: 'paragraph';
      title: string;
      content: string;
    }
  | {
      type: 'key-value-list';
      title: string;
      items: { label: string; value: string }[];
    }
  | {
      type: 'entries';
      title: string;
      entries: CvExperienceEntry[];
    }
  | {
      type: 'bullet-list';
      title: string;
      items: CvBulletItem[];
    };

export interface CvData {
  id: 'professional' | 'academic';
  label: string;
  pdfPath: string;
  downloadFilename: string;
  header: {
    name: string;
    title: string;
    location: string;
  };
  sections: CvSection[];
  footerNote?: string;
}

export type ArticleCategory = 'cryptography' | 'math' | 'general';

export interface ArticleItem {
  slug: string;
  title: string;
  category: ArticleCategory;
  href: string;
  external?: boolean;
}

export const ARTICLE_CATEGORIES: { id: ArticleCategory; label: string }[] = [
  { id: 'cryptography', label: 'Cryptography' },
  { id: 'math', label: 'Math' },
  { id: 'general', label: 'General' }
];

export const SITE_CONTENT = {
  profile: {
    name: 'Julio de Mello Bezerra',
    location: 'Regensburg, Germany',
    githubUrl: 'https://github.com/JuliodeMelloBezerra',
    curveSmashUrl: 'https://www.yukon.org/curvesmash',
    portraitPath: './assets/eu.jpeg',
    portraitAlt: 'Julio de Mello Bezerra in the Bavarian Alps',
    portraitCaption: 'Bavarian Alps'
  },

  articles: [
    {
      slug: 'stnfs',
      title: 'Smashing the Tower Number Field Sieve',
      category: 'cryptography',
      href: './articles/stnfs/index.html',
      external: false
    },
    {
      slug: 'strong-pseudoprimes',
      title: 'Constructing Strong Pseudoprimes',
      category: 'cryptography',
      href: './articles/strong-pseudoprimes/index.html',
      external: false
    },
    {
      slug: 'beyond-kkm',
      title: 'Beyond KKM (with Youssef El Housni)',
      category: 'cryptography',
      href: 'https://yelhousni.github.io/beyond-kkm/',
      external: true
    },
    {
      slug: 'shintani-cocycle-polylogarithms',
      title: 'Shintani cocycle decomposition of topological polylogarithms',
      category: 'math',
      href: 'https://arxiv.org/abs/2610.32363',
      external: true
    }
    // To add a General article, add an item with `category: 'general'` —
    // the General subsection will automatically appear on the home page.
  ] as ArticleItem[],

    cvs: {
        professional: {
          id: 'professional',
          label: 'Professional CV',
          pdfPath: './assets/CV.pdf',
          downloadFilename: 'Julio_de_Mello_Bezerra_CV.pdf',
          header: {
            name: 'Julio de Mello Bezerra',
            title: 'Mathematics PhD | Cryptography & Cryptanalysis',
            location: 'Regensburg, Germany'
          },
          sections: [
            {
              type: 'paragraph',
              title: 'Profile',
              content:
                'PhD mathematician specializing in number theory and arithmetic geometry, with a broad theoretical command of classical and post-quantum cryptography. Experienced in analyzing cryptographic constructions and cryptanalytic techniques, independently validating mathematical arguments, identifying algorithmic improvements and potential security weaknesses, and turning research literature into computational experiments using Python and SageMath. Particularly adept at rapidly mastering new technical domains and translating complex theoretical concepts into actionable security analysis for real-world cryptographic systems and protocols.'
            },
            {
              type: 'key-value-list',
              title: 'Skills & Languages',
              items: [
                {
                  label: 'Cryptographic Focus',
                  value:
                    'Elliptic-curve & pairing-based cryptography, zkSNARKs, cryptanalysis, primality testing and number-field sieve algorithms.'
                },
                {
                  label: 'Additional Knowledge',
                  value:
                    'RSA and AES, lattice-based and isogeny-based post-quantum cryptography.'
                },
                {
                  label: 'Programming & Tools',
                  value: 'Python, SageMath, LaTeX, basic familiarity with Linux & Git.'
                },
                {
                  label: 'Languages',
                  value:
                    'English (Fluent), German (Working Proficiency – University teaching experience), Portuguese (Native), Spanish (Basic Proficiency)'
                }
              ]
            },
            {
              type: 'entries',
              title: 'Cryptographic Research & Projects',
              entries: [
                {
                  organization:
                    'Yukon CurveSmash Autoresearch Project (<a href="https://www.yukon.org/curvesmash#curvesmash-judges" target="_blank" rel="noopener noreferrer">yukon.org/curvesmash</a>)',
                  role: 'Judge & Cryptanalysis Researcher',
                  period: '2026 – Present',
                  location: 'Remote',
                  bullets: [
                    {
                      label: 'Multi-Curve Cryptanalysis',
                      text: 'Independently evaluated and mathematically verified AI-assisted cryptanalytic approaches against widely used elliptic curves (BLS12-381, BN254, secp256k1 & secp256r1). Compared proposed attacks against existing literature, audited attack strategies and identified improved parameters.'
                    },
                    {
                      label:
                        'Security of Pairing-Friendly Curves (<a href="https://juliodemellobezerra.github.io/articles/stnfs/index.html" target="_blank" rel="noopener noreferrer">Article</a>)',
                      text: 'Authored an interactive technical analysis of the SexTNFS attack, comparing CurveSmash\'s advancements with the existing state of the art in the literature. Refined attack-cost estimates and reduced the expected security of pairing-friendly curves, specifically BLS12-381 & BN254.'
                    },
                    {
                      label:
                        'zkSNARK Setup Security (<a href="https://yelhousni.github.io/beyond-kkm/" target="_blank" rel="noopener noreferrer">Article</a>)',
                      text: 'Co-authored Beyond the Cheon-Kozaki-Kutsuma-Matsuo attack, analyzing the algebraic and algorithmic ideas behind new discrete-logarithm speedups that exploit "powers-of-tau" auxiliary inputs, often used in KZG commitment schemes.'
                    }
                  ]
                },
                {
                  organization: 'Applied & Theoretical Cryptography',
                  role: 'Projects & Study',
                  period: '2026',
                  location: 'Independent',
                  bullets: [
                    {
                      label:
                        'From Research Papers to Optimized Code (<a href="https://juliodemellobezerra.github.io/articles/strong-pseudoprimes/index.html" target="_blank" rel="noopener noreferrer">Article</a> & <a href="https://github.com/JuliodeMelloBezerra/Strong-Pseudoprimes" target="_blank" rel="noopener noreferrer">Code</a>)',
                      text: 'Authored an interactive article and Python/SageMath implementation on adversarial primality testing (forging composites that fool naive Miller-Rabin prime checks), translating research papers into optimized executable code and achieving orders-of-magnitude speedups via single-pass CRT alignment, segmented sieving and quadratic reciprocity.'
                    },
                    {
                      label: 'CTF Challenges',
                      text: 'Solved over 70 Capture-the-Flag challenges on <a href="https://cryptohack.org/user/WertherSamsa/" target="_blank" rel="noopener noreferrer">cryptohack.org</a> (<a href="https://cryptohack.org/user/WertherSamsa/" target="_blank" rel="noopener noreferrer">reaching the top 1% of users</a>) by implementing practical attacks in Python and SageMath across most standard symmetric and asymmetric schemes, such as AES in various modes, RSA, Diffie-Hellman, ECC and more.'
                    },
                    {
                      label: 'Post-Quantum Cryptography',
                      text: 'Studied quantum cryptanalytic algorithms and isogeny-based protocols as a participant in the QuSoft reading group on Quantum Algorithms for Isogenies (Spring 2021), as well as the subsequent higher-dimensional attack on SIDH. Studied lattice-based post-quantum cryptography through ML-KEM (CRYSTALS-Kyber), including its role in hybrid key-exchange protocols in TLS 1.3.'
                    }
                  ]
                }
              ]
            },
            {
              type: 'entries',
              title: 'Professional Experience',
              entries: [
                {
                  organization: 'University of Regensburg',
                  role: 'Doctoral Researcher & Lecturer',
                  period: 'Oct 2020 – Jul 2026',
                  location: 'Regensburg, Germany',
                  bullets: [
                    {
                      label: 'Research',
                      text: 'Conducted independent research in number theory and arithmetic geometry resulting in a magna cum laude doctoral thesis, alongside collaborative research in advanced departmental seminars (Oberseminare).'
                    },
                    {
                      label: 'Teaching',
                      text: 'Instructed undergraduate and graduate courses across 8 semesters in English and German, covering general mathematics as well as advanced seminars in cryptography-relevant topics including Elliptic Curves and Lattices.'
                    },
                    {
                      label: 'Conferences',
                      text: 'Co-organized <a href="https://sfb-higher-invariants.app.uni-regensburg.de/index.php/Eisenstein2021" target="_blank" rel="noopener noreferrer">a workshop on Eisenstein series and equivariant cohomology</a>, delivered research talks in Germany, France, and the UK, and participated in multiple international conferences across Europe.'
                    }
                  ]
                }
              ]
            },
            {
              type: 'entries',
              title: 'Education',
              entries: [
                {
                  organization: 'University of Regensburg',
                  role: 'Doktor der Naturwissenschaften (PhD in Mathematics) – magna cum laude',
                  period: 'Apr 2026',
                  location: 'Regensburg, Germany',
                  bullets: [
                    {
                      label: 'Thesis',
                      text: 'Shintani cocycle decomposition of topological polylogarithms'
                    }
                  ]
                },
                {
                  organization: 'University of Regensburg & Leiden University',
                  role: 'ALGANT Master in Mathematics (Scholarship Recipient)',
                  period: 'Aug 2020',
                  location: 'Germany & Netherlands',
                  bullets: []
                },
                {
                  organization: 'Universidade Federal do Rio de Janeiro (UFRJ)',
                  role: 'Bachelor in Pure Mathematics',
                  period: 'Jan 2018',
                  location: 'Rio de Janeiro, Brazil',
                  bullets: []
                }
              ]
            },
            {
              type: 'bullet-list',
              title: 'Selected Technical Writing and Accomplishments',
              items: [
                {
                  label: 'Cryptanalysis Article',
                  text: 'J. de Mello Bezerra and Y. El Housni, “Smashing the Tower Number Field Sieve — BLS12-381 (Part 1),” <a href="https://juliodemellobezerra.github.io/articles/stnfs/index.html" target="_blank" rel="noopener noreferrer">juliodemellobezerra.github.io</a> (2026).'
                },
                {
                  label: 'Cryptanalysis Article',
                  text: 'Y. El Housni and J. de Mello Bezerra, “Beyond the Cheon-Kozaki-Kutsuma-Matsuo attack,” <a href="https://yelhousni.github.io/beyond-kkm/" target="_blank" rel="noopener noreferrer">yelhousni.github.io/beyond-kkm</a> (2026).'
                },
                {
                  label: 'Technical Article',
                  text: 'J. de Mello Bezerra, “Constructing Strong Pseudoprimes,” <a href="https://juliodemellobezerra.github.io/articles/strong-pseudoprimes/index.html" target="_blank" rel="noopener noreferrer">juliodemellobezerra.github.io</a> (2026).'
                },
                {
                  label: 'Mathematics Preprint',
                  text: 'J. de Mello Bezerra, “Shintani cocycle decomposition of topological polylogarithms,” <a href="https://arxiv.org/abs/2610.32363" target="_blank" rel="noopener noreferrer">arXiv:2610.32363</a> (2026).'
                },
                {
                  label: 'Award',
                  text: 'Silver Medal (30th out of 9,531 participants), Brazilian Computer Science Olympics (2010).'
                }
              ]
            }
          ]
        } as CvData,

    academic: {
      id: 'academic',
      label: 'Academic CV',
      pdfPath: './assets/Academic_CV.pdf',
      downloadFilename: 'Julio_de_Mello_Bezerra_Academic_CV.pdf',
      header: {
        name: 'Julio de Mello Bezerra, PhD',
        title: 'Curriculum Vitae',
        location: 'Regensburg, Germany'
      },
      sections: [
        {
          type: 'key-value-list',
          title: 'Personal Data',
          items: [
            { label: 'Country', value: 'Germany' },
            { label: 'City', value: 'Regensburg' },
            { label: 'Nationalities', value: 'Brazilian & Portuguese' }
          ]
        },
        {
          type: 'bullet-list',
          title: 'Languages',
          items: [
            { label: 'Portuguese', text: 'Native.' },
            { label: 'English', text: 'Fluent.' },
            { label: 'German', text: 'Professional proficiency' },
            { label: 'Spanish', text: 'Basic proficiency.' },
            { label: 'French', text: 'Basic mathematical reading.' }
          ]
        },
        {
          type: 'bullet-list',
          title: 'Education Timeline',
          items: [
            {
              label: 'April 2026',
              text: 'Defended title of Doktor der Naturwissenschaften (PhD in Mathematics) – magna cum laude, titled Shintani cocycle decomposition of topological polylogarithms.'
            },
            {
              label: 'October 2020 - April 2026',
              text: 'PhD student and member of the SFB “Higher Invariants” at Regensburg University.'
            },
            {
              label: 'August 2020',
              text: 'Completed Master studies at Regensburg University, jointly with Leiden University as part of the ALGANT Master Program.'
            },
            {
              label: 'September 2019',
              text: 'Enrolled as Master student at Regensburg University for the second year of the ALGANT program. Sponsored by Scholarship.'
            },
            {
              label: 'September 2018',
              text: 'Enrolled in the ALGANT Master Program at Leiden University.'
            },
            {
              label: 'January 2018 - March 2018',
              text: 'Approved in the graduate level summer course “Topics in Modular Forms and Elliptic Curves” at IMPA (National Institute of Pure and Applied Mathematics) as an external student.'
            },
            {
              label: 'January 2018',
              text: 'Graduated as a Bachelor in Pure Mathematics at Universidade Federal do Rio de Janeiro (Federal University of Rio de Janeiro).'
            },
            {
              label: '2014',
              text: 'Enrolled in the undergraduate Mathematics course at Universidade Federal do Rio de Janeiro (Federal University of Rio de Janeiro).'
            },
            {
              label: '2013',
              text: 'Completed high school at Colégio Prudente de Morais, Salto, SP, Brazil.'
            }
          ]
        },
        {
          type: 'bullet-list',
          title: 'Teaching',
          items: [
            {
              text: 'Taught “Analysis auf Mannigfaltigkeiten” Übung + Zentralübung (English: teaching assistant for lecture on Analysis on Manifolds) at the Regensburg University on the Summer Semester 2026.'
            },
            {
              text: 'Taught “Analysis 3” Übung (English: teaching assistant for lecture on Analysis 3 - complex analysis and measure theory) at the Regensburg University on the Winter Semester 2025.'
            },
            {
              text: 'Taught “Galois Representations and L-functions Seminar” at the Regensburg University on the Summer Semester 2025.'
            },
            {
              text: 'Taught “Abelian Varieties Seminar” at the Regensburg University on the Winter Semester 2024.'
            },
            {
              text: 'Taught “Modulformen Seminar” (English: Modular Forms Seminar) at the Regensburg University on the Summer Semester 2024.'
            },
            {
              text: 'Taught “Zeta und L-funktionen Seminar” (English: Zeta and L-functions Seminar) at the Regensburg University on the Winter Semester 2023.'
            },
            {
              text: 'Taught “Elliptische Kurven Seminar” (English: Elliptic Curves Seminar) and “Riemannsche Flächen” Übung + Zentralübung (English: teaching assistant for lecture on Riemannian Surfaces) at the Regensburg University on the Summer Semester 2023.'
            },
            {
              text: 'Taught “Poitou-Tate Duality Seminar” at the Regensburg University on the Winter Semester 2022.'
            },
            {
              text: 'Teaching assistant for Algebra I (sponsored by scholarship) at the Federal University of Rio de Janeiro from January 2015 - July 2015.'
            }
          ]
        },
        {
          type: 'bullet-list',
          title: 'Publications',
          items: [
            {
              text: 'J. de Mello Bezerra, “Shintani cocycle decomposition of topological polylogarithms,” arXiv:2610.32363 (2026).'
            }
          ]
        },
        {
          type: 'bullet-list',
          title: 'Honours and Events',
          items: [
            {
              text: 'Presented “What is a Reciprocity Law?” at the Algant Alumni Network Symposium in St Jacut de La Mer, Bretagne, France on October 5th 2023.'
            },
            {
              text: 'Presented “Cohomological approaches to rationality of L-values” at the Warwick Junior Number Theory Seminar in Warwick, England on November 14th 2022.'
            },
            {
              text: 'Assisted in the organization of the workshop “Eisenstein series and equivariant cohomology” at the Regensburg University, which took place on July 5-7, 2021.'
            },
            {
              text: 'Presented the project “The Weyl Group of E6 and the 27 Lines in a Cubic Surface” in the annual fair (XXXIX Jornada Giulio Massarani de Iniciação Científica, Tecnológica, Artística e Cultural). Sponsored by PIBIC Scholarship - 2017.'
            },
            {
              text: 'Presented the project “Primes of the form x² + ny² Part 2” in the annual fair (XXXVIII Jornada Giulio Massarani de Iniciação Científica, Tecnológica, Artística e Cultural). Sponsored by PIBIC Scholarship - 2016.'
            },
            {
              text: 'Received honours for presenting the project “The Ring of Algebraic Integers of Quadratic Fields” in the annual fair (XXXVII Jornada Giulio Massarani de Iniciação Científica, Tecnológica, Artística e Cultural). Selected the Best Project in the Mathematics Institute. Sponsored by PIBIC Scholarship - 2015.'
            },
            {
              text: 'Placed 30th out of 9531 (Silver Medal) in the Brazilian Computer Science Olympics (Olimpíada Brasileira de Informática) - 2010.'
            }
          ]
        }
      ],
      footerNote: 'Regensburg, November 4, 2026'
    } as CvData
  }
};

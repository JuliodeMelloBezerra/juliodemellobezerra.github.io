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
            'PhD Mathematician transitioning from pure mathematics into applied cryptography, bringing a strong theoretical foundation in classical and post-quantum encryption. Proven ability to translate advanced mathematical literature into functional code, with practical experience implementing attacks and algorithms in Python and SageMath. Track record of analytical problem-solving, evidenced by academic history, cryptographic research projects and CTF challenges.'
        },
        {
          type: 'key-value-list',
          title: 'Language Skills',
          items: [
            {
              label: 'Languages',
              value:
                'English (Fluent), Portuguese (Native), German (Working Proficiency), Spanish (Basic Proficiency)'
            },
            {
              label: 'Programming',
              value: 'Python, SageMath, LaTeX'
            }
          ]
        },
        {
          type: 'entries',
          title: 'Cryptographic Research & Projects',
          entries: [
            {
              organization: 'Yukon CurveSmash Project (yukon.org/curvesmash)',
              role: 'Judge & Cryptanalysis Researcher',
              period: '2026 – Present',
              location: 'Remote',
              bullets: [
                {
                  text: 'Evaluated and advanced state-of-the-art elliptic curve cryptanalysis in a project combining modern AI capabilities with human mathematical expertise, resulting in a co-authored article (Beyond the Cheon-Kozaki-Kutsuma-Matsuo attack) analyzing improved attack parameters.'
                },
                {
                  text: 'Investigating pairing inversion security on modern pairing-friendly curves, with an upcoming technical article in preparation, by applying the Special Tower Number Field Sieve (STNFS) attack to BLS12-381.'
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
                  label: 'Algorithm Implementation',
                  text: 'Authored a technical article and Python/SageMath implementation demonstrating how to construct strong pseudoprimes that bypass primality tests, by translating classical cryptography papers into optimized executable code.'
                },
                {
                  label: 'CTF Challenges',
                  text: 'Solved a wide range of Capture-the-Flag challenges on cryptohack.org (reaching the top 1% of users) by implementing practical attacks across most standard symmetric and asymmetric schemes.'
                },
                {
                  label: 'Post-Quantum',
                  text: 'Studied general post-quantum protocols and isogeny-based hardness assumptions as a participant in the QuSoft reading group on Quantum Algorithms for Isogenies (Spring 2021).'
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
              role: 'PhD Researcher & Lecturer',
              period: 'Oct 2020 – Jul 2026',
              location: 'Regensburg, Germany',
              bullets: [
                {
                  label: 'Research',
                  text: 'Conducted independent research in number theory and arithmetic geometry resulting in a magna cum laude doctoral thesis and a preprint, alongside collaborative research in advanced research seminars (Oberseminare).'
                },
                {
                  label: 'Teaching',
                  text: 'Extensive teaching experience across 8 semesters in both English and German, in general undergraduate math courses as well as advanced seminars in cryptography-relevant topics such as Elliptic Curves and Lattices.'
                },
                {
                  label: 'Conferences',
                  text: 'Co-organized a workshop on Eisenstein series and equivariant cohomology, delivered research talks in Germany, France, and the UK, and participated in multiple conferences across Europe.'
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
              role: 'ALGANT Master in Mathematics',
              period: 'Aug 2020',
              location: 'Germany & Netherlands',
              bullets: [
                {
                  text: 'Scholarship recipient in joint international master’s programme focused on algebra, geometry, and number theory.'
                }
              ]
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
          title: 'Selected Publications & Awards',
          items: [
            {
              label: 'Mathematics Preprint',
              text: 'J. de Mello Bezerra, “Shintani cocycle decomposition of topological polylogarithms,” arXiv:2610.32363 (2026).'
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

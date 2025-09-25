/* global React, ReactDOM */
(function () {
  const { useEffect, useMemo, useState } = React;

  const STORAGE_KEY = "satwinder_portfolio_data_v1";

  const seedData = {
    profile: {
      name: "Dr Satwinder Singh",
      title: "Postdoctoral Research Fellow | University of Auckland",
      tagline: "Inclusive speech technology • Dysarthric ASR • Low‑resource language AI",
      location: "Auckland, New Zealand",
      phone: "+64 21 147 6789",
      email: "satwinder.singh@auckland.ac.nz",
      links: [
        { label: "LinkedIn", href: "https://linkedin.com/in/satwinder-singh-8a211551/" },
        { label: "UoA Profile", href: "https://profiles.auckland.ac.nz/satwinder-singh" },
        { label: "CV (PDF)", href: "assets/cv.pdf" },
      ],
    },
    news: [
      {
        id: crypto.randomUUID(),
        date: "2025-05-01",
        title: "ICASSP 2025: Two dysarthric ASR papers accepted",
        summary:
          "Excited to share our new results on robust, cross‑etiology, speaker‑independent recognition and the Dysarthric Speech Conformer.",
        link: ""
      },
      {
        id: crypto.randomUUID(),
        date: "2024-12-10",
        title: "ICONIP 2024 paper presented",
        summary:
          "Comprehensive evaluation of Whisper for dysarthric speech recognition and practical guidance for deployments.",
        link: ""
      }
    ],
    projects: [
      {
        id: crypto.randomUUID(),
        title: "Robust Dysarthric ASR (Speaker‑Independent)",
        period: "2024–present",
        blurb:
          "Developing resilient ASR models for atypical speech across multiple etiologies, with fairness and accessibility at the core.",
        skills: ["Whisper", "Transformers", "Adaptation", "Evaluation"],
      },
      {
        id: crypto.randomUUID(),
        title: "EMD‑based Augmentation for Māori ASR",
        period: "2025",
        blurb:
          "Exploring Empirical Mode Decomposition to enrich acoustic variability for te reo Māori and allied accents.",
        skills: ["EMD", "Augmentation", "Low‑resource"],
      },
      {
        id: crypto.randomUUID(),
        title: "Punjabi Speech Corpora (Real & Synthetic)",
        period: "2021–2023",
        blurb:
          "Building and releasing resources for Punjabi ASR, including multiple synthesized datasets.",
        skills: ["Datasets", "Synthesis", "Benchmarking"],
      }
    ],
    publications: [
      {
        year: 2025,
        status: "published",
        title: "Robust Cross‑Etiology and Speaker‑Independent Dysarthric Speech Recognition",
        venue: "IEEE ICASSP 2025",
        authors:
          "Satwinder Singh, Qianli Wang, Zihan Zhong, Clarion Mendes, Mark Hasegawa‑Johnson, Waleed Abdulla, Seyed Reza Shahamiri",
        link: ""
      },
      {
        year: 2025,
        status: "submitted",
        title: "Efficient Adaptation of Large‑Scale ASR for Robust Dysarthric Speech Recognition",
        venue: "IEEE Signal Processing Letters",
        authors:
          "Qianli Wang, Zihan Zhong, Satwinder Singh, Clarion Mendes, Mark Hasegawa‑Johnson, Waleed Abdulla, Seyed Reza Shahamiri",
        link: ""
      },
      {
        year: 2025,
        status: "submitted",
        title: "Empowering Māori Automatic Speech Recognition through EMD‑Based Augmentation",
        venue: "PRICAI 2025",
        authors: "Chengxi Lei, Satwinder Singh, Feng Hou, Huia Jahnke, Ruili Wang",
        link: ""
      },
      {
        year: 2025,
        status: "submitted",
        title:
          "Convolution‑Augmented Transformers for Enhanced Speaker‑Independent Dysarthric Speech Recognition",
        venue: "IEEE TNSRE",
        authors:
          "Zihan Zhong, Qianli Wang, Satwinder Singh, Clarion Mendes, Mark Hasegawa‑Johnson, Waleed Abdulla, Seyed Reza Shahamiri",
        link: ""
      },
      {
        year: 2025,
        status: "submitted",
        title:
          "Beyond Binary Detection: Multi‑Etiology Dysarthria Classification with Pre‑trained Speech Models",
        venue: "APSIPA ASC 2025",
        authors:
          "Zihan Zhong, Qianli Wang, Satwinder Singh, Clarion Mendes, Mark Hasegawa‑Johnson, Waleed Abdulla, Seyed Reza Shahamiri",
        link: ""
      },
      {
        year: 2025,
        status: "published",
        title:
          "Dysarthric Speech Conformer: Adaptation for Sequence‑to‑Sequence Dysarthric Speech Recognition",
        venue: "IEEE ICASSP 2025",
        authors:
          "Qianli Wang, Zihan Zhong, Satwinder Singh, Clarion Mendes, Mark Hasegawa‑Johnson, Waleed Abdulla, Seyed Reza Shahamiri",
        link: ""
      },
      {
        year: 2024,
        status: "published",
        title:
          "A Comprehensive Performance Evaluation of Whisper Models in Dysarthric Speech Recognition",
        venue: "ICONIP 2024",
        authors:
          "Satwinder Singh, Zihan Zhong, Qianli Wang, Clarion Mendes, Mark Hasegawa‑Johnson, Waleed Abdulla, Seyed Reza Shahamiri",
        link: ""
      },
      {
        year: 2023,
        status: "published",
        title: "Phase Perturbation: Speech Data Augmentation for Automatic Speech Recognition",
        venue: "ACM MM Asia 2023",
        authors: "Chengxi Lei, Satwinder Singh*, Xiaoyun Jia, Feng Hou, Ruili Wang",
        link: ""
      },
      {
        year: 2023,
        status: "dataset",
        title: "Punjabi Speech: A Labeled Speech Corpus",
        venue: "Mendeley Data 2023",
        authors: "Satwinder Singh, Ruili Wang, Feng Hou",
        link: "https://doi.org/10.17632/sdbc8f5b77.1"
      },
      {
        year: 2023,
        status: "dataset",
        title: "Google‑synth: A Synthesized Punjabi Speech Dataset",
        venue: "Figshare 2023",
        authors: "Satwinder Singh, Ruili Wang, Feng Hou",
        link: "https://doi.org/10.6084/m9.figshare.23615607.v1"
      },
      {
        year: 2023,
        status: "dataset",
        title: "CMU‑synth: A Synthesized Punjabi Speech Dataset",
        venue: "Figshare 2023",
        authors: "Satwinder Singh, Ruili Wang, Feng Hou",
        link: "https://doi.org/10.6084/m9.figshare.23606697.v1"
      },
      {
        year: 2023,
        status: "published",
        title: "Real and Synthetic Punjabi Speech Datasets for Speech Recognition",
        venue: "Data in Brief 2023",
        authors: "Satwinder Singh, Ruili Wang, Feng Hou",
        link: ""
      },
      {
        year: 2023,
        status: "published",
        title: "A Novel Self‑training Approach for Low‑resource Speech Recognition",
        venue: "Interspeech 2023",
        authors: "Satwinder Singh, Ruili Wang, Feng Hou",
        link: ""
      },
      {
        year: 2022,
        status: "preprint",
        title: "Enhancing E2E ASR for Low‑Resource Punjabi Using Synthesized Datasets",
        venue: "SSRN 4181844 (2022)",
        authors: "Satwinder Singh, Ruili Wang, Feng Hou, Zhizhong Ma",
        link: ""
      },
      {
        year: 2022,
        status: "published",
        title: "Improved Meta‑Learning for Low‑Resource Speech Recognition",
        venue: "IEEE ICASSP 2022",
        authors: "Satwinder Singh, Ruili Wang, Feng Hou",
        link: ""
      },
      {
        year: 2022,
        status: "published",
        title: "CyclicAugment: Speech Data Random Augmentation with Cosine Annealing",
        venue: "Interspeech 2022",
        authors:
          "Zhihan Wang, Feng Hou, Yuanhang Qiu, Zhizhong Ma, Satwinder Singh, Ruili Wang",
        link: ""
      },
      {
        year: 2022,
        status: "published",
        title: "Automatic Speech‑based Smoking Status Identification",
        venue: "Computing Conference 2022",
        authors:
          "Zhizhong Ma, Feng Hou, Satwinder Singh, Yuanhang Qiu, Ruili Wang, Christopher Bullen, Joanna Ting Wai Chu",
        link: ""
      },
      {
        year: 2021,
        status: "published",
        title: "DEEPF0: End‑to‑End Fundamental Frequency Estimation for Music and Speech",
        venue: "IEEE ICASSP 2021",
        authors: "Satwinder Singh, Ruili Wang, Yuanhang Qiu",
        link: ""
      },
      {
        year: 2021,
        status: "published",
        title:
          "Towards Objective Speech Assessment of Smoking Status based on Voice Features: A Review",
        venue: "Journal of Voice, 2021",
        authors:
          "Zhizhong Ma, Chris Bullen, Joanna Ting Wai Chu, Ruili Wang, Yingchun Wang, Satwinder Singh",
        link: ""
      },
      {
        year: 2021,
        status: "published",
        title: "Self‑Supervised Phone‑Fortified Speech Enhancement",
        venue: "Interspeech 2021",
        authors: "Yuanhang Qiu, Ruili Wang, Satwinder Singh, Zhizhong Ma, Feng Hou",
        link: ""
      },
      {
        year: 2015,
        status: "published",
        title: "Dual Layer Security using LSB Image Steganography (ARGB) and AES‑128",
        venue: "IJSIP 2015",
        authors: "Satwinder Singh, Varinder Kaur Attri",
        link: ""
      },
      {
        year: 2015,
        status: "published",
        title: "State‑of‑the‑art Review on Steganographic Techniques",
        venue: "IJSIP 2015",
        authors: "Satwinder Singh, Varinder Kaur Attri",
        link: ""
      }
    ],
    experience: [
      {
        role: "Postdoctoral Research Fellow",
        org: "Dept. of Electrical, Computer & Software Engineering, University of Auckland",
        period: "2024 – present",
        bullets: [
          "Automatic Speech Recognition for Dysarthric Speech",
          "Supervising undergraduate and postgraduate research",
        ]
      },
      {
        role: "Postdoctoral Research Fellow",
        org: "School of Mathematical & Computational Sciences, Massey University",
        period: "Jul 2023 – Dec 2023",
        bullets: [
          "NLP for Q&A in indigenous/vernacular languages (MBIE Catalyst Strategic)"
        ]
      },
      {
        role: "Research Assistant",
        org: "SMCS, Massey University",
        period: "Nov 2022 – Mar 2023",
        bullets: [
          "Assisted with Information Sciences Research Methods course",
          "Supported Marsden & MURF funding applications; Catalyst research"
        ]
      },
      {
        role: "Tutor",
        org: "Pinnacle Global Academy (PGA)",
        period: "Jul 2021 – Feb 2022",
        bullets: ["Mathematics and Python programming; exam prep"]
      },
      {
        role: "Assistant Professor",
        org: "Faculty of Computational Sciences, GNA University, India",
        period: "Jul 2016 – Feb 2018",
        bullets: [
          "Taught graduate & post‑graduate courses; lecture scheduling; supervision"
        ]
      }
    ],
    education: [
      {
        degree: "PhD (Computer Science)",
        org: "Massey University",
        period: "2018 – 2023",
        details: "Thesis: End‑to‑End ASR for Low‑Resource Languages"
      },
      {
        degree: "MTech (CSE)",
        org: "Guru Nanak Dev University",
        period: "2013 – 2015",
        details: "Thesis: Dual Layer Security via ARGB LSB Steganography + AES‑128"
      },
      {
        degree: "BTech (CSE)",
        org: "Punjab Technical University",
        period: "2010 – 2013",
        details: "Key courses: OOP (C++/Java), Web (PHP/MySQL)"
      },
      {
        degree: "Diploma (Computer Engineering)",
        org: "Mehr Chand Polytechnic College",
        period: "2007 – 2010",
        details: "Programming with C; Networks; Databases; SE"
      }
    ],
    teaching: [
      "OOPS101 (C++), WBTC101 (Web Tech), OSYS101 (OS), WBAL101 (Web Analytics), LISP201 (Linux & Shell), PYPR101 (Python), ARIN101 (AI)"
    ],
    supervision: [
      "Ben Wang (PhD, 2024–27): ASR & assessment for atypical speech",
      "Zihan Zhong (PhD, 2024–27): Speech therapy system for speech impaired",
      "Chengxi Lei (PhD, 2023–26): Low‑resource ASR",
      "Multiple BE(Hons) projects (2024–25): diarization, intelligibility, augmentation, UDI‑ASR, dyslexic text tools"
    ],
    talks: [
      "ICASSP 2025: Dysarthric Speech Conformer (talk)",
      "ICONIP/others: Whisper for Dysarthric ASR",
      "Guest lectures: Research Methods (Massey), Fundamentals of DL (GNA)"
    ],
    awards: [
      "Fee Scholarship (2018–23), PhD Stipend (2022), COVID‑19 Bursary (2022)",
      "Best Talk (2020), Academic Excellence (2013), Best Web Design (2012)"
    ],
    service: [
      "Workshop organizer (Transformers), Interspeech GC 2026 organizer",
      "AIRANZ postdoc representative, ACM MM Asia LOC (2024)",
      "Reviewer (Neurocomputing, CIS, PLoS One, Data in Brief, Applied AI Letters, ICASSP)"
    ],
    skills: {
      research: [
        "Low‑resource speech technology (incl. te reo Māori)",
        "AI accessibility for speech‑impaired",
        "Deep learning across speech/image/text",
        "Neural speaker diarization"
      ],
      programming: ["Python", "C/C++", "Java", "Shell", "JavaScript", "HTML5", "PHP"],
      frameworks: ["PyTorch", "Keras", "Scikit‑learn"],
      tools: ["VS Code", "PyCharm", "Jupyter", "LaTeX"]
    }
  };

  function classNames() {
    return Array.from(arguments).filter(Boolean).join(" ");
  }

  function saveToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function usePortfolioData() {
    const [data, setData] = useState(() => loadFromStorage() || seedData);
    useEffect(() => saveToStorage(data), [data]);
    return [data, setData];
  }

  function Section({ id, title, children, className = "" }) {
    return React.createElement(
      "section",
      { id, className: classNames("scroll-mt-24", className) },
      React.createElement(
        "div",
        { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" },
        React.createElement("h2", { className: "text-2xl md:text-3xl font-semibold tracking-tight mb-4" }, title),
        children
      )
    );
  }

  function Card({ children }) {
    return React.createElement(
      "div",
      { className: "rounded-2xl shadow-sm bg-white/80 backdrop-blur border border-slate-200 p-4 md:p-6" },
      children
    );
  }

  function Tag({ children }) {
    return React.createElement(
      "span",
      { className: "inline-block text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200 mr-2 mb-2" },
      children
    );
  }

  function Anchor({ href, children }) {
    const props = {
      className: "text-sky-700 hover:text-sky-900 underline underline-offset-2",
      href: href,
    };
    if (href && href.startsWith("http")) {
      props.target = "_blank";
      props.rel = "noreferrer";
    }
    return React.createElement("a", props, children);
  }

  function ToolbarButton({ onClick, children }) {
    return React.createElement(
      "button",
      { onClick, className: "px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm" },
      children
    );
  }

  function SimpleListSection({ id, title, items }) {
    return React.createElement(
      Section,
      { id, title },
      React.createElement(
        Card,
        null,
        React.createElement(
          "ul",
          { className: "list-disc pl-5 space-y-1 text-sm" },
          items.map((x, i) => React.createElement("li", { key: i }, x))
        )
      )
    );
  }

  function NewsSection({ data, setData, editMode }) {
    const [form, setForm] = useState({
      title: "",
      date: new Date().toISOString().slice(0, 10),
      summary: "",
      link: ""
    });

    const addNews = () => {
      if (!form.title.trim()) return alert("Title is required");
      const item = { ...form, id: crypto.randomUUID() };
      setData({ ...data, news: [item, ...data.news] });
      setForm({ title: "", date: new Date().toISOString().slice(0, 10), summary: "", link: "" });
    };

    const removeNews = (id) => {
      setData({ ...data, news: data.news.filter((n) => n.id !== id) });
    };

    return React.createElement(
      Section,
      { id: "news", title: "News & Updates" },
      editMode &&
        React.createElement(
          Card,
          null,
          React.createElement(
            "div",
            { className: "grid md:grid-cols-4 gap-3 items-end" },
            React.createElement(
              "div",
              { className: "md:col-span-2" },
              React.createElement("label", { className: "text-sm block mb-1" }, "Title"),
              React.createElement("input", {
                className: "w-full px-3 py-2 rounded-xl border border-slate-300",
                value: form.title,
                onChange: (e) => setForm({ ...form, title: e.target.value }),
                placeholder: "e.g., Paper accepted at ..."
              })
            ),
            React.createElement(
              "div",
              null,
              React.createElement("label", { className: "text-sm block mb-1" }, "Date"),
              React.createElement("input", {
                type: "date",
                className: "w-full px-3 py-2 rounded-xl border border-slate-300",
                value: form.date,
                onChange: (e) => setForm({ ...form, date: e.target.value })
              })
            ),
            React.createElement(
              "div",
              null,
              React.createElement("label", { className: "text-sm block mb-1" }, "Link (optional)"),
              React.createElement("input", {
                className: "w-full px-3 py-2 rounded-xl border border-slate-300",
                value: form.link,
                onChange: (e) => setForm({ ...form, link: e.target.value }),
                placeholder: "https://..."
              })
            ),
            React.createElement(
              "div",
              { className: "md:col-span-4" },
              React.createElement("label", { className: "text-sm block mb-1" }, "Summary (optional)"),
              React.createElement("textarea", {
                className: "w-full px-3 py-2 rounded-xl border border-slate-300",
                rows: 3,
                value: form.summary,
                onChange: (e) => setForm({ ...form, summary: e.target.value }),
                placeholder: "One‑line description of the update"
              })
            ),
            React.createElement(
              "div",
              null,
              React.createElement(ToolbarButton, { onClick: addNews }, "Add News")
            )
          )
        ),
      React.createElement(
        "div",
        { className: "mt-4 grid md:grid-cols-2 gap-4" },
        data.news
          .slice()
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map((n) =>
            React.createElement(
              Card,
              { key: n.id },
              React.createElement(
                "div",
                { className: "flex items-start justify-between" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("div", { className: "text-xs text-slate-500" }, n.date),
                  React.createElement("h3", { className: "font-semibold" }, n.title),
                  n.summary && React.createElement("p", { className: "text-sm mt-1" }, n.summary),
                  n.link &&
                    React.createElement(
                      "div",
                      { className: "mt-1 text-sm" },
                      React.createElement(Anchor, { href: n.link }, "Read more")
                    )
                ),
                editMode &&
                  React.createElement(
                    "button",
                    {
                      onClick: () => removeNews(n.id),
                      title: "Delete",
                      className: "text-slate-400 hover:text-red-600",
                      "aria-label": "Delete news item"
                    },
                    "✕"
                  )
              )
            )
          )
      )
    );
  }

  function AddPublication({ data, setData }) {
    const thisYear = new Date().getFullYear();
    const [p, setP] = useState({
      title: "",
      authors: "",
      venue: "",
      year: thisYear,
      status: "submitted",
      link: ""
    });

    const add = () => {
      if (!p.title.trim()) return alert("Title is required");
      const next = { ...data, publications: [{ ...p, year: Number(p.year) }, ...data.publications] };
      setData(next);
      setP({ title: "", authors: "", venue: "", year: thisYear, status: "submitted", link: "" });
    };

    return React.createElement(
      "div",
      { className: "mt-4" },
      React.createElement(
        Card,
        null,
        React.createElement("h3", { className: "font-semibold mb-3" }, "Add Publication"),
        React.createElement(
          "div",
          { className: "grid md:grid-cols-3 gap-3" },
          React.createElement(
            "div",
            { className: "md:col-span-2" },
            React.createElement("label", { className: "text-sm block mb-1" }, "Title"),
            React.createElement("input", {
              className: "w-full px-3 py-2 rounded-xl border border-slate-300",
              value: p.title,
              onChange: (e) => setP({ ...p, title: e.target.value })
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement("label", { className: "text-sm block mb-1" }, "Year"),
            React.createElement("input", {
              type: "number",
              className: "w-full px-3 py-2 rounded-xl border border-slate-300",
              value: p.year,
              onChange: (e) => setP({ ...p, year: e.target.value })
            })
          ),
          React.createElement(
            "div",
            { className: "md:col-span-3" },
            React.createElement("label", { className: "text-sm block mb-1" }, "Authors"),
            React.createElement("input", {
              className: "w-full px-3 py-2 rounded-xl border border-slate-300",
              value: p.authors,
              onChange: (e) => setP({ ...p, authors: e.target.value })
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement("label", { className: "text-sm block mb-1" }, "Venue"),
            React.createElement("input", {
              className: "w-full px-3 py-2 rounded-xl border border-slate-300",
              value: p.venue,
              onChange: (e) => setP({ ...p, venue: e.target.value })
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement("label", { className: "text-sm block mb-1" }, "Status"),
            React.createElement(
              "select",
              {
                className: "w-full px-3 py-2 rounded-xl border border-slate-300",
                value: p.status,
                onChange: (e) => setP({ ...p, status: e.target.value })
              },
              React.createElement("option", { value: "submitted" }, "Submitted"),
              React.createElement("option", { value: "published" }, "Published"),
              React.createElement("option", { value: "dataset" }, "Dataset"),
              React.createElement("option", { value: "preprint" }, "Preprint")
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement("label", { className: "text-sm block mb-1" }, "Link"),
            React.createElement("input", {
              className: "w-full px-3 py-2 rounded-xl border border-slate-300",
              value: p.link,
              onChange: (e) => setP({ ...p, link: e.target.value }),
              placeholder: "https://doi.org/..."
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(ToolbarButton, { onClick: add }, "Add")
          )
        )
      )
    );
  }

  function App() {
    const [data, setData] = usePortfolioData();
    const [editMode, setEditMode] = useState(false);
    const [pubQuery, setPubQuery] = useState("");
    const [pubFilter, setPubFilter] = useState("all");

    const pubView = useMemo(() => {
      const q = pubQuery.trim().toLowerCase();
      return [...data.publications]
        .filter((p) => (pubFilter === "all" ? true : p.status === pubFilter))
        .filter((p) =>
          !q
            ? true
            : [p.title, p.venue, p.authors, String(p.year)]
                .filter(Boolean)
                .some((t) => t.toLowerCase().includes(q))
        )
        .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    }, [data.publications, pubQuery, pubFilter]);

    const exportJSON = () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "satwinder-portfolio-data.json";
      a.click();
      URL.revokeObjectURL(url);
    };

    const importJSON = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const obj = JSON.parse(reader.result);
          setData(obj);
        } catch (e) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    };

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "header",
        { className: "sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200" },
        React.createElement(
          "div",
          { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3" },
          React.createElement("a", { href: "#top", className: "font-semibold tracking-tight text-slate-900" }, data.profile.name),
          React.createElement(
            "nav",
            { className: "hidden md:flex gap-4 text-sm" },
            [
              ["About", "about"],
              ["News", "news"],
              ["Projects", "projects"],
              ["Publications", "publications"],
              ["Experience", "experience"],
              ["Teaching", "teaching"],
              ["Supervision", "supervision"],
              ["Talks", "talks"],
              ["Awards", "awards"],
              ["Service", "service"],
              ["Skills", "skills"],
              ["Contact", "contact"],
            ].map(([label, id]) =>
              React.createElement("a", { key: id, href: `#${id}`, className: "hover:text-slate-900 text-slate-600" }, label)
            )
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(ToolbarButton, { onClick: () => setEditMode((v) => !v) }, editMode ? "Exit Edit" : "Edit Mode"),
            React.createElement(ToolbarButton, { onClick: exportJSON }, "Export"),
            React.createElement(
              "label",
              { className: "px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-sm cursor-pointer" },
              "Import",
              React.createElement("input", {
                type: "file",
                accept: "application/json",
                className: "hidden",
                onChange: (e) => e.target.files && e.target.files[0] && importJSON(e.target.files[0])
              })
            )
          )
        )
      ),
      React.createElement(
        "section",
        { className: "relative", id: "top" },
        React.createElement(
          "div",
          { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14" },
          React.createElement(
            "div",
            { className: "grid md:grid-cols-3 gap-6 items-stretch" },
            React.createElement(
              Card,
              null,
              React.createElement("h1", { className: "text-3xl md:text-4xl font-semibold tracking-tight" }, data.profile.name),
              React.createElement("p", { className: "text-slate-700 mt-2" }, data.profile.title),
              React.createElement("p", { className: "mt-3 text-slate-600" }, data.profile.tagline),
              React.createElement(
                "div",
                { className: "mt-4 flex flex-wrap gap-2" },
                data.profile.links.map((l) => React.createElement(Anchor, { key: l.label, href: l.href }, l.label))
              )
            ),
            React.createElement(
              Card,
              null,
              React.createElement("h3", { className: "font-semibold mb-3" }, "At a glance"),
              React.createElement(
                "ul",
                { className: "list-disc pl-5 space-y-2 text-sm" },
                React.createElement("li", null, "Focus: Dysarthric speech recognition, inclusivity, evaluation"),
                React.createElement("li", null, "Tooling: Whisper, Transformers, PyTorch"),
                React.createElement("li", null, "Datasets: SAP, TORGO, Punjabi Speech, Māori ASR augmentation")
              ),
              React.createElement(
                "div",
                { className: "mt-4" },
                React.createElement(Tag, null, "Open to collaboration"),
                React.createElement(Tag, null, "Mentoring")
              )
            ),
            React.createElement(
              Card,
              null,
              React.createElement("h3", { className: "font-semibold mb-3" }, "Contact"),
              React.createElement(
                "div",
                { className: "text-sm space-y-1" },
                React.createElement("div", null, "📍 ", data.profile.location),
                React.createElement(
                  "div",
                  null,
                  "✉️ ",
                  React.createElement(Anchor, { href: `mailto:${data.profile.email}` }, data.profile.email)
                ),
                React.createElement("div", null, "📞 ", data.profile.phone)
              )
            )
          )
        )
      ),
      React.createElement(
        Section,
        { id: "about", title: "About" },
        React.createElement(
          Card,
          null,
          React.createElement(
            "p",
            { className: "leading-7" },
            "I build inclusive speech technologies for atypical speech, especially dysarthria. My work spans robust ASR, data curation for low‑resource languages, and practical deployment guidance for clinicians and communities. I collaborate across engineering and health to translate research into impact."
          )
        )
      ),
      React.createElement(NewsSection, { data, setData, editMode }),
      React.createElement(
        Section,
        { id: "projects", title: "Projects" },
        React.createElement(
          "div",
          { className: "grid md:grid-cols-3 gap-4" },
          data.projects.map((p) =>
            React.createElement(
              Card,
              { key: p.id },
              React.createElement(
                "div",
                { className: "flex items-start justify-between" },
                React.createElement("h3", { className: "font-semibold text-lg" }, p.title),
                React.createElement("span", { className: "text-xs text-slate-500" }, p.period)
              ),
              React.createElement("p", { className: "mt-2 text-sm text-slate-700" }, p.blurb),
              React.createElement(
                "div",
                { className: "mt-3 flex flex-wrap" },
                (p.skills || []).map((s) => React.createElement(Tag, { key: s }, s))
              )
            )
          )
        )
      ),
      React.createElement(
        Section,
        { id: "publications", title: "Publications" },
        React.createElement(
          Card,
          null,
          React.createElement(
            "div",
            { className: "flex flex-col md:flex-row md:items-end gap-3 md:gap-6" },
            React.createElement(
              "div",
              { className: "grow" },
              React.createElement("label", { className: "text-sm block mb-1" }, "Search"),
              React.createElement("input", {
                className: "w-full px-3 py-2 rounded-xl border border-slate-300",
                placeholder: "Title, venue, author, or year",
                value: pubQuery,
                onChange: (e) => setPubQuery(e.target.value)
              })
            ),
            React.createElement(
              "div",
              null,
              React.createElement("label", { className: "text-sm block mb-1" }, "Filter"),
              React.createElement(
                "select",
                {
                  className: "px-3 py-2 rounded-xl border border-slate-300",
                  value: pubFilter,
                  onChange: (e) => setPubFilter(e.target.value)
                },
                React.createElement("option", { value: "all" }, "All"),
                React.createElement("option", { value: "published" }, "Published"),
                React.createElement("option", { value: "submitted" }, "Submitted"),
                React.createElement("option", { value: "dataset" }, "Dataset"),
                React.createElement("option", { value: "preprint" }, "Preprint")
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "mt-4 space-y-3" },
          pubView.map((p, idx) =>
            React.createElement(
              Card,
              { key: `${p.title}-${idx}` },
              React.createElement(
                "div",
                { className: "flex flex-col md:flex-row md:items-baseline md:justify-between gap-2" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("h3", { className: "font-semibold" }, p.title),
                  React.createElement("p", { className: "text-sm text-slate-700" }, p.authors),
                  React.createElement("p", { className: "text-sm text-slate-600" }, `${p.venue} · ${p.year}`),
                  React.createElement(
                    "div",
                    { className: "mt-2" },
                    React.createElement(Tag, null, p.status),
                    p.link
                      ? React.createElement(Anchor, { href: p.link }, "Link")
                      : React.createElement("span", { className: "text-xs text-slate-400 ml-2" }, "No link")
                  )
                )
              )
            )
          )
        ),
        React.createElement(AddPublication, { data, setData })
      ),
      React.createElement(
        Section,
        { id: "experience", title: "Experience" },
        React.createElement(
          "div",
          { className: "space-y-3" },
          data.experience.map((e, i) =>
            React.createElement(
              Card,
              { key: i },
              React.createElement(
                "div",
                { className: "flex flex-col md:flex-row md:items-baseline md:justify-between" },
                React.createElement(
                  "div",
                  null,
                  React.createElement("h3", { className: "font-semibold" }, e.role),
                  React.createElement("p", { className: "text-sm text-slate-700" }, e.org)
                ),
                React.createElement("p", { className: "text-sm text-slate-500" }, e.period)
              ),
              React.createElement(
                "ul",
                { className: "mt-2 list-disc pl-5 text-sm space-y-1" },
                (e.bullets || []).map((b, j) => React.createElement("li", { key: j }, b))
              )
            )
          )
        )
      ),
      React.createElement(SimpleListSection, { id: "teaching", title: "Teaching", items: data.teaching }),
      React.createElement(SimpleListSection, { id: "supervision", title: "Supervision / Mentoring", items: data.supervision }),
      React.createElement(SimpleListSection, { id: "talks", title: "Invited Talks / Posters", items: data.talks }),
      React.createElement(SimpleListSection, { id: "awards", title: "Awards & Scholarships", items: data.awards }),
      React.createElement(SimpleListSection, { id: "service", title: "Service", items: data.service }),
      React.createElement(
        Section,
        { id: "skills", title: "Research Expertise & Skills" },
        React.createElement(
          "div",
          { className: "grid md:grid-cols-3 gap-4" },
          React.createElement(
            Card,
            null,
            React.createElement("h3", { className: "font-semibold mb-2" }, "Research"),
            React.createElement(
              "div",
              { className: "flex flex-wrap" },
              data.skills.research.map((s) => React.createElement(Tag, { key: s }, s))
            )
          ),
          React.createElement(
            Card,
            null,
            React.createElement("h3", { className: "font-semibold mb-2" }, "Programming"),
            React.createElement(
              "div",
              { className: "flex flex-wrap" },
              data.skills.programming.map((s) => React.createElement(Tag, { key: s }, s))
            )
          ),
          React.createElement(
            Card,
            null,
            React.createElement("h3", { className: "font-semibold mb-2" }, "Frameworks & Tools"),
            React.createElement(
              "div",
              { className: "flex flex-wrap" },
              [...data.skills.frameworks, ...data.skills.tools].map((s) => React.createElement(Tag, { key: s }, s))
            )
          )
        )
      ),
      React.createElement(
        Section,
        { id: "contact", title: "Contact" },
        React.createElement(
          Card,
          null,
          React.createElement(
            "div",
            { className: "grid md:grid-cols-3 gap-4 text-sm" },
            React.createElement(
              "div",
              null,
              React.createElement("div", { className: "font-medium" }, "Email"),
              React.createElement(Anchor, { href: `mailto:${data.profile.email}` }, data.profile.email)
            ),
            React.createElement(
              "div",
              null,
              React.createElement("div", { className: "font-medium" }, "Location"),
              React.createElement("div", null, data.profile.location)
            ),
            React.createElement(
              "div",
              null,
              React.createElement("div", { className: "font-medium" }, "Links"),
              React.createElement(
                "div",
                { className: "flex flex-wrap gap-2 mt-1" },
                data.profile.links.map((l) => React.createElement(Anchor, { key: l.label, href: l.href }, l.label))
              )
            )
          )
        )
      ),
      React.createElement(
        "footer",
        { className: "py-10 text-center text-xs text-slate-500" },
        `© ${new Date().getFullYear()} Satwinder Singh · Built with React + Tailwind. Data persists in your browser.`
      )
    );
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App));
})();
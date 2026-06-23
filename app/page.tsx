"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { 
  AnimatePresence, 
  motion 
} from "motion/react";
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  MapPin, 
  Calendar, 
  Award, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  Heart, 
  Sparkles, 
  Info, 
  Users, 
  X, 
  FileText, 
  Camera, 
  Compass, 
  Gift, 
  Search, 
  ArrowRight,
  Clock,
  Mail,
  User,
  ExternalLink
} from "lucide-react";

// Types
interface Puppy {
  id: string;
  name: string;
  breed: "Barboncino" | "Maltese" | "Golden Retriever" | "Cavalier King";
  breedDetail: string;
  sex: "Maschio" | "Femmina";
  priceClass: string;
  birthDate: string;
  availableFrom: string;
  status: "disponibile" | "prenotabile" | "in_arrivo" | "adottato" | "in_famiglia";
  character: string[];
  description: string;
  imgUrl: string;
  additionalImages: string[];
  parents: {
    father: string;
    fatherHealth: string;
    mother: string;
    motherHealth: string;
  };
}

interface Parent {
  id: string;
  name: string;
  breed: string;
  sex: "Maschio" | "Femmina";
  title: string;
  healthTests: string[];
  photo: string;
}

// Structured mock data that reflects highly premium standard dog breeding
const PUPPIES_DATA: Puppy[] = [
  {
    id: "flora",
    name: "Flora",
    breed: "Barboncino",
    breedDetail: "Toy Rosso Elegante",
    sex: "Femmina",
    priceClass: "Selezione d'Elite",
    birthDate: "1 Luglio 2025",
    availableFrom: "Disponibile",
    status: "in_famiglia",
    character: ["Dolcissima", "Tranquilla", "Silenziosa", "Super Coccole"],
    description: "Flora è una meravigliosa cagnolina di Barboncino Toy dal pelo soffice riccio fulvo lucente, nata il 1° Luglio 2025. Ha un temperamento estremamente calmo, ama rilassarsi sulle braccia ed è adorabile in ogni interazione domestica. Perfetta per la vita d'appartamento.",
    imgUrl: "https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-avt-0068c001-no/6343e53c8e80dfd7be25e3a9580b4c8e~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=10399&refresh_token=07cdd2d5&x-expires=1782378000&x-signature=raevz4bQyS2qnDI9GAKraSk66Ew%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=no1a",
    additionalImages: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=850"
    ],
    parents: {
      father: "Ch. Romeo di Casa Terry (Toy Rosso, ENCI eccellente, PRA clear)",
      fatherHealth: "Ecocardiogramma Ok • DNA Depositato",
      mother: "Chloe di Casa Terry (Toy Fulvo Excel, rotula certificata esente FSA)",
      motherHealth: "Test Genetici Completi Ok"
    }
  },
  {
    id: "ambra",
    name: "Ambra",
    breed: "Barboncino",
    breedDetail: "Toy Albicocca (Cucciola)",
    sex: "Femmina",
    priceClass: "Selezionata per Famiglia",
    birthDate: "18 Aprile 2026",
    availableFrom: "28 Giugno 2026",
    status: "in_famiglia",
    character: ["Equilibratissima", "Giocherellona", "Obbediente", "Dolce con i Bambini"],
    description: "Ambra è una splendida cucciola di Barboncino Toy dal meraviglioso colore miele dorato (albicocca). Nata il 18 Aprile 2026, è vispa, dolcissima e perfettamente sana. Adora il gioco activo ed ha già iniziato con successo il programma di prima socializzazione.",
    imgUrl: "https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-avt-0068c001-no/d5d2b1b58d3297a9ce5582a0a3776a87~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=10399&refresh_token=1c89fc97&x-expires=1782381600&x-signature=OZSSvluP4jxfregQwRJtcTlhZfU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=no1a",
    additionalImages: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=850"
    ],
    parents: {
      father: "Ch. Romeo di Casa Terry (Toy Rosso, ENCI eccellente, PRA clear)",
      fatherHealth: "Certificato FSA Ufficiale • Riproduttore Selezionato",
      mother: "Isotta di Casa Terry (Toy Albicocca, rotula certificata esente FSA)",
      motherHealth: "Lastre Ufficiali Rotula/Gomito Ok"
    }
  },
  {
    id: "simon",
    name: "Simon",
    breed: "Barboncino",
    breedDetail: "Toy Rosso (Fulvo)",
    sex: "Maschio",
    priceClass: "Prestigio",
    birthDate: "12 Aprile 2026",
    availableFrom: "25 Giugno 2026",
    status: "in_famiglia",
    character: ["Vivace", "Intelligente", "Super Affettuoso", "Adatto a Bambini"],
    description: "Simon è un delizioso cucciolo di Barboncino Toy dal raro e brillante mantello fulvo intenso (rosso). Di corporatura compatta ed elegantissima, brilla per la sua intelligenza vivace. È molto gioioso, impara all'istante i comandi di base ed è anallergico al 100%.",
    imgUrl: "https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-avt-0068c001-no/f7a092dcfd04c0ae8daa28888fb3cb4a~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=10399&refresh_token=7cbe52ba&x-expires=1782381600&x-signature=d5OMeZLean%2F7oaQ0leYwzVmJmG0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=no1a",
    additionalImages: [
      "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=850"
    ],
    parents: {
      father: "Ch. Romeo di Casa Terry (Toy Rosso, ENCI eccellente, PRA clear)",
      fatherHealth: "Test Genetici Completi Ok",
      mother: "Dolly della Corte d'Oro (Toy Rosso, esente oculopatie ereditarie)",
      motherHealth: "Rotula L-0/R-0 Ok"
    }
  },
  {
    id: "sofia",
    name: "Sofia",
    breed: "Barboncino",
    breedDetail: "Toy Fulvo Chiaro",
    sex: "Femmina",
    priceClass: "Elite Show",
    birthDate: "18 Aprile 2026",
    availableFrom: "28 Giugno 2026",
    status: "disponibile",
    character: ["Graziosa", "Regale", "Super Affettuosa", "Adatta ad Anziani"],
    description: "Sofia è una splendida cucciola di Barboncino Toy, nata il 18 Aprile 2026 (stessa nidiata di Ambra). Di colore fulvo chiaro lucido, è estremamente dolce, ricerca costantemente la carezza e si adatta squisitamente all'umore dei suoi compagni umani.",
    imgUrl: "https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-avt-0068c001-no/eae8864fbab60c023fa1ce86dc5248d2~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=10399&refresh_token=ead521c4&x-expires=1782381600&x-signature=ZxjdHmScMmtLnM%2Bf1LC4D7YVIY8%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=no1a",
    additionalImages: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=850"
    ],
    parents: {
      father: "Ch. Romeo di Casa Terry (Toy Rosso, ENCI eccellente, PRA clear)",
      fatherHealth: "Esame Ecocardiografico FSA Ok",
      mother: "Ginevra My Fair Lady (Toy Apricot, Esente rotula grado 0)",
      motherHealth: "Certificazioni Genetiche Ufficiali"
    }
  },
  {
    id: "lilly",
    name: "Lilly",
    breed: "Barboncino",
    breedDetail: "Toy Albicocca (Apricot)",
    sex: "Femmina",
    priceClass: "Prestigio",
    birthDate: "22 Febbraio 2024",
    availableFrom: "Disponibile",
    status: "in_famiglia",
    character: ["Curiosa", "Socievole", "Arguta", "Dolce Compagna"],
    description: "Lilly è una dolcissima Barboncina Toy nata il 22 Febbraio 2024. Incanta per la sua andatura fiera e affettuosa. Trova sempre il modo di farsi notare con le svelti zampette delicate e adora accoccolarsi sulla spalla. Del tutto esente da perdita di pelo (pelo anallergico).",
    imgUrl: "https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-avt-0068c001-no/4adab7042207724b9066ad3dd17a9c61~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=10399&refresh_token=6f3a43ac&x-expires=1782381600&x-signature=ksXgGpIOopv4aiITMDOUfHlRyhs%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=no1a",
    additionalImages: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=850"
    ],
    parents: {
      father: "Ch. Romeo di Casa Terry (Toy Rosso, ENCI eccellente, PRA clear)",
      fatherHealth: "Ecocardiogramma Ok",
      mother: "Mimi Jolie (Toy Apricot, dentatura corretta, esente rotula)",
      motherHealth: "Test Genetici Completi Ok"
    }
  }
];

const PARENTS_DATA: Parent[] = [
  {
    id: "parent-flora",
    name: "Flora",
    breed: "Barboncino Toy Rosso",
    sex: "Femmina",
    title: "Soggetto Allevamento d'Elite",
    healthTests: [
      "Lussazione Rotula: FSA Grado 0",
      "Oculopatie Congenite: Esente",
      "Cardiopatie Ereditarie: Libera",
      "DNA: Depositato ENCI"
    ],
    photo: "https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-avt-0068c001-no/6343e53c8e80dfd7be25e3a9580b4c8e~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=10399&refresh_token=07cdd2d5&x-expires=1782378000&x-signature=raevz4bQyS2qnDI9GAKraSk66Ew%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=no1a"
  },
  {
    id: "parent-simon",
    name: "Simon",
    breed: "Barboncino Toy Rosso",
    sex: "Maschio",
    title: "Soggetto Allevamento Nazionale",
    healthTests: [
      "PRA-prcd: Sano/Esente (N/N)",
      "Lussazione Rotula: Grado 0.0",
      "Mielopatia Degenerativa: DM N/N",
      "Esame Oculistico Annuo: Esente (2026)"
    ],
    photo: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "parent-ambra",
    name: "Ambra",
    breed: "Barboncino Toy Albicocca",
    sex: "Femmina",
    title: "Soggetto Allevamento Bellezza",
    healthTests: [
      "Cataratta Ereditaria: Libero",
      "Displasia Anca: HD-A (Esente)",
      "Displasia Gomito: ED-0 (Esente)",
      "PRA 1 - PRA 2: Negativo/Sano"
    ],
    photo: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=600"
  }
];

const FAQS = [
  {
    question: "Tutti i cuccioli sono venduti con il Pedigree?",
    answer: "Assolutamente sì. In Italia, vendere o cedere cani di razza dichiarata senza pedigree è un reato penale (D.Lgs. 529/1992). Tutti i nostri cuccioli sono iscritti all'anagrafe canina regionale, muniti di microchip e registrati ufficialmente al libro genealogico dell'ENCI (Ente Nazionale Cinofilia Italiana) con pedigree ROI."
  },
  {
    question: "A quale età è possibile accogliere il cucciolo a casa?",
    answer: "I cuccioli lasciano l'allevamento NON prima delle 80-90 giornate di vita. Questo periodo è cruciale per la corretta socializzazione con la madre ed i fratelli, lo svezzamento completo e il completamento del primo protocollo vaccinale (due vaccini e tre trattamenti di sverminazione)."
  },
  {
    question: "In cosa consiste il 'Metodo Biosens' o Stimolazione Precoce?",
    answer: "È un protocollo di stimolazione neurologica programmata che applichiamo dal 3° al 16° giorno di vita dei cuccioli. Consiste in piccoli esercizi termici, tattili e gravitazionali controllati. Studi scientifici provano che aumenta la resistenza cardiovascolare, rafforza le ghiandole surrenali, migliora la tolleranza allo stress e stimola l'apprendimento rapido."
  },
  {
    question: "Cosa comprende il 'Puppy Kit' allegato al cucciolo?",
    answer: "Ogni cucciolo va via con una copertina flanellata che conserva l'odore della madre per facilitare i primi sonni, un sacco di crocchette top-quality Starter, la ciotolina infrangibile, il libretto sanitario timbrato dal veterinario certificatore, il certificato di inoculazione del microchip, copia dei test genetici dei genitori ed una guida scritta dettagliata redatta da noi per una corretta crescita."
  }
];

export default function Home() {
  // Navigation & Interactive states
  const [filterBreed, setFilterBreed] = useState<string>("Tutti");
  const [filterStatus, setFilterStatus] = useState<string>("Tutti");
  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
  // Custom contact form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formBreed, setFormBreed] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Quiz interactive state
  const [quizStep, setQuizStep] = useState(0); // 0: start, 1-4: questions, 5: result
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  // Filtered puppies
  const filteredPuppies = useMemo(() => {
    return PUPPIES_DATA.filter((pup) => {
      const matchBreed = filterBreed === "Tutti" || pup.breed === filterBreed;
      const matchStatus = filterStatus === "Tutti" || 
        (filterStatus === "Disponibili" && (pup.status === "disponibile" || pup.status === "prenotabile")) ||
        (filterStatus === "In Famiglia" && pup.status === "in_famiglia") ||
        (filterStatus === "Ceduti" && pup.status === "adottato");
      return matchBreed && matchStatus;
    });
  }, [filterBreed, filterStatus]);

  // Handle quiz questions
  const quizQuestions = useMemo(() => [
    {
      id: "space",
      question: "Dove vivrà principalmente il cucciolo?",
      options: [
        { label: "Appartamento senza terrazzi esterni", value: "apartment" },
        { label: "Casa con giardino recintato", value: "garden" },
        { label: "Grande cortile o campagna aperta", value: "country" }
      ]
    },
    {
      id: "activity",
      question: "Quanto tempo dedicate quotidianamente all'attività dinamica all'aperto?",
      options: [
        { label: "Passeggiate brevi attorno all'isolato (fino a 30 minuti)", value: "low" },
        { label: "Passeggiate moderate, parchi ed esplorazione (1-2 ore)", value: "medium" },
        { label: "Sportivo attivo, trekking, corse in montagna (oltre 2 ore)", value: "high" }
      ]
    },
    {
      id: "family",
      question: "Chi compone principalmente il vostro nucleo familiare?",
      options: [
        { label: "Persona singola o coppia senza bambini piccoli", value: "couple" },
        { label: "Famiglia vivace con bambini piccoli o neonati", value: "kids" },
        { label: "Presenza di persone anziane che desiderano compagnia dolce", value: "senior" }
      ]
    },
    {
      id: "allergy",
      question: "Ci sono soggetti con allergie o infastiditi dalla perdita di pelo?",
      options: [
        { label: "Sì, preferiamo assolutamente una razza anallergica (non perde pelo)", value: "hypo" },
        { label: "No, non è un problema spazzolare regolarmente e raccogliere pelo", value: "none" }
      ]
    }
  ], []);

  const handleQuizAnswer = (questionId: string, optionValue: string) => {
    const updatedAnswers = { ...quizAnswers, [questionId]: optionValue };
    setQuizAnswers(updatedAnswers);

    if (quizStep < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    }
  };

  // Process quiz result
  const quizResult = useMemo(() => {
    if (quizStep !== quizQuestions.length + 1) return null;

    const space = quizAnswers.space;
    const activity = quizAnswers.activity;
    const family = quizAnswers.family;

    let breed = "Barboncino Toy Fulvo / Rosso";
    let text = "Il compagno perfetto per voi è il Barboncino Toy Rosso o Fulvo! È anallergico al 100% (non perde pelo ed è privo di forfora volatile), straordinario per la vita da casa, ha un'intelligenza finissima che semplifica l'addestramento ed è sempre felice di giocare ed accogliere gli amici.";
    let img = "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=700";
    let whatsappMsg = "Ciao Casa Terry! Abbiamo fatto il vostro test sul sito ed il nostro match ideale è il Barboncino Toy Fulvo/Rosso. Vorremmo informazioni sulle vostre cucciolate disponibili o future programmate!";

    if (activity === "high" || space === "garden" || space === "country") {
      breed = "Barboncino Toy Rosso (Vivace e Sportivo)";
      text = "Il vostro stile di vita dinamico richiama fortemente il carismatico Barboncino Toy Rosso! Sensibilissimo, affettuoso all'inverosimile con i bambini ed estremamente energico e gioioso all'aria aperta. Ama imparare giochi, correre in giardino ed è eccezionale per chi desidera un compagno vispo e salutare.";
      img = "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=700";
      whatsappMsg = "Ciao Casa Terry! Dal vostro test sul sito, il nostro compagno ideale risulta il vivace Barboncino Toy Rosso. Saremmo felici di ricevere info sui cuccioli disponibili!";
    } else if (family === "senior" || space === "apartment") {
      breed = "Barboncino Toy Albicocca (Calmo ed Empatico)";
      text = "Il dolcissimo Barboncino Toy Albicocca (Apricot) è la vostra anima gemella! Pacato, infinitamente sensibile ed attento. Si adatta all'istante all'umore dei suoi cari, adora essere coccolato in poltrona e fare passeggiate tranquille nel parco. Perfetto per appartamento o compagnia dolce.";
      img = "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=700";
      whatsappMsg = "Ciao Casa Terry! Il test ci ha indicato il dolcissimo Barboncino Toy Albicocca. Avete delle cucciolate di questa splendida razza per le quali chiedere info?";
    }

    return { breed, text, img, whatsappMsg };
  }, [quizStep, quizAnswers, quizQuestions.length]);

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizStep(0);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen text-brand-dark bg-[#FAF7F2] font-sans selection:bg-brand-accent selection:text-white">
      {/* EXQUISITE LUXURY TOP BAR */}
      <div className="bg-brand-dark text-white text-xs py-2.5 overflow-hidden z-50 relative border-b border-white/[0.08]" id="top-announcement-bar">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee-slow {
            display: inline-flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }
        `}} />
        <div className="whitespace-nowrap flex gap-12 text-[10px] sm:text-xs font-light tracking-wider uppercase animate-marquee-slow">
          <span className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            {"Allevamento Riconosciuto • Alta Selezione Italiana d'Elite"}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            Sede nelle Marche: Via Tassona 17 A, Mercatino Conca (PU)
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            Visite ed incontri solo su appuntamento
          </span>
          <span className="flex items-center gap-2 flex-nowrap shrink-0">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <a href="https://wa.me/393882412052" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">WhatsApp: 388 2412052</a>
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            100% Barboncino Toy del pedigree ROI eccellente allevati in famiglia
          </span>
          
          {/* Duplicate elements for seamless loop */}
          <span className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            {"Allevamento Riconosciuto • Alta Selezione Italiana d'Elite"}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            Sede nelle Marche: Via Tassona 17 A, Mercatino Conca (PU)
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            Visite ed incontri solo su appuntamento
          </span>
          <span className="flex items-center gap-2 flex-nowrap shrink-0">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <a href="https://wa.me/393882412052" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">WhatsApp: 388 2412052</a>
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            100% Barboncino Toy del pedigree ROI eccellente allevati in famiglia
          </span>
        </div>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 bg-brand-cream/95 backdrop-blur-md z-45 border-b border-brand-accent/10 transition-all duration-300 shadow-sm" id="main-navigation-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group" id="brand-logo-link">
            <div className="bg-brand-dark text-brand-accent p-2.5 rounded-full transition-transform duration-300 group-hover:rotate-12 shadow-sm border border-brand-accent/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-dark block leading-none">
                Casa Terry
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-accent block mt-1">
                {"Allevamento Etico d'Elite"}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-brand-medium" id="desktop-menu-nav">
            <a href="#cuccioli" className="hover:text-brand-accent transition-colors duration-200">I Cuccioli</a>
            <a href="#metodo" className="hover:text-brand-accent transition-colors duration-200">Il Nostro Metodo</a>
            <a href="#test" className="hover:text-brand-accent transition-colors duration-200">Trova il tuo Cane</a>
            <a href="#faq" className="hover:text-brand-accent transition-colors duration-200">FAQ</a>
            <a href="#contatti" className="hover:text-brand-accent transition-colors duration-200">Contatti</a>
          </nav>

          {/* Desktop Contact CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://wa.me/393882412052?text=Ciao%20Casa%20Terry!%20Vi%20contatto%20dal%20sito.%20Vorrei%20sapere%20i%20cuccioli%20disponibili%20ora."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-full flex items-center gap-2 shadow-sm border border-emerald-500/10 transition-all cursor-pointer hover:shadow-emerald-100"
              id="nav-whatsapp-cta-button"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>CONTATTO RAPIDO</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-brand-accent-light text-brand-dark focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-burger-button"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-full h-0.5 bg-brand-dark rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2 absolute top-0" : ""}`}></span>
              <span className={`w-full h-0.5 bg-brand-dark rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-full h-0.5 bg-brand-dark rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2 absolute bottom-2" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#FAF7F2] border-b border-brand-accent/15 overflow-hidden"
              id="mobile-navigation-drawer"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <a 
                  href="#cuccioli" 
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent border-b border-brand-accent-light"
                >
                  I Cuccioli
                </a>
                <a 
                  href="#metodo" 
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent border-b border-brand-accent-light"
                >
                  Il Nostro Metodo
                </a>
                <a 
                  href="#test" 
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent border-b border-brand-accent-light"
                >
                  Trova il tuo Cane (Test)
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent border-b border-brand-accent-light"
                >
                  FAQ
                </a>
                <a 
                  href="#contatti" 
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-base font-medium text-brand-dark hover:text-brand-accent border-b border-brand-accent-light"
                >
                  Contatti
                </a>

                {/* Instant Mobile Call */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/393882412052?text=Ciao%20Filippo!%20Sono%20interessato%20a%20venire%20a%20trovarvi%20per%20vedere%20i%20cuccioli."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-center shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>WhatsApp Rapido: 388 2412052</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28" id="hero-presentation">
        {/* Soft background aesthetics to avoid boring flat looking pages */}
        <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] rounded-full bg-brand-accent-light/40 blur-3xl -z-10"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-brand-sage/10 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Prestigious badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent-light text-brand-accent-dark font-semibold text-xs tracking-wide uppercase mx-auto lg:mx-0 shadow-sm border border-brand-accent/20 select-none">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                <span>Allevamento Etico Certificato ENCI</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark leading-[1.1]">
                Non compri solo un cane, <br />
                <span className="text-brand-accent font-medium italic">accogli un pezzo di cuore.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-brand-medium max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                All’<strong>Allevamento Casa Terry</strong> cresciamo anime. Selezioniamo con dedizione biologica cuccioli di <strong>Barboncino Toy</strong> dotati di formidabile equilibrio nervoso, linee di alta genealogia, pedigree prestigioso e totale certificazione medica dei genitori.
              </p>

              {/* Real highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-brand-accent/15 p-1 rounded-full text-brand-accent">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-brand-dark uppercase tracking-wider">Socializzazione</h4>
                    <p className="text-xs text-brand-medium">Protocollo Bio-Sens</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-brand-accent/15 p-1 rounded-full text-brand-accent">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-brand-dark uppercase tracking-wider">Salute di Ferro</h4>
                    <p className="text-xs text-brand-medium">Genitori Lastrati e Testati</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 col-span-2 sm:col-span-1">
                  <div className="mt-1 bg-brand-accent/15 p-1 rounded-full text-brand-accent">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-brand-dark uppercase tracking-wider">Pieno Accordo</h4>
                    <p className="text-xs text-brand-medium">Consegne Etiche Personali</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a 
                  href="#cuccioli" 
                  className="w-full sm:w-auto bg-brand-dark text-white hover:bg-brand-medium active:scale-95 font-bold px-8 py-4 rounded-xl text-center shadow-lg hover:shadow-xl transition-all"
                  id="hero-view-puppies-button"
                >
                  Sfoglia la Galleria
                </a>
                
                {/* WHATSAPP CTA WITH ATTENTION RING */}
                <a 
                  href="https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Vi%20scrivo%20dal%20sito.%20Vorrei%20poter%20parlare%20con%20voi%20dei%20cucciolotti%20disponibili."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all relative group cursor-pointer"
                  id="hero-whatsapp-pulse-button"
                >
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                  </span>
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <div className="text-left leading-none">
                    <span className="block text-[10px] uppercase tracking-wider font-light opacity-80">Click per Chiacchierare</span>
                    <span className="block text-sm">388 2412052</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column Custom Image Collage (No generic AI layouts!) */}
            <div className="lg:col-span-5 mt-16 lg:mt-0 relative" id="hero-visual-frame">
              {/* Elegant paper layered effect */}
              <div className="relative mx-auto max-w-[340px] sm:max-w-[380px]">
                {/* Background decorative square */}
                <div className="absolute top-4 -left-4 w-full h-full rounded-2xl border-2 border-brand-accent/30 -z-10 rotate-3"></div>
                
                {/* Main Image Frame */}
                <div className="bg-white p-4 rounded-2xl shadow-xl rotate-[-2deg] transition-transform duration-500 hover:rotate-0">
                  <div className="aspect-[4/5] relative overflow-hidden rounded-xl bg-brand-accent-light">
                    <Image
                      src="https://p16-common-sign.tiktokcdn-eu.com/tos-no1a-avt-0068c001-no/eae8864fbab60c023fa1ce86dc5248d2~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=10399&refresh_token=ead521c4&x-expires=1782381600&x-signature=ZxjdHmScMmtLnM%2Bf1LC4D7YVIY8%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=no1a"
                      alt="Sofia • Barboncino Toy Fulvo"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      priority
                    />
                    <div className="absolute bottom-3 left-3 bg-brand-dark/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs leading-none font-semibold">
                      Sofia • Barboncino Toy Fulvo
                    </div>
                  </div>
                  <div className="pt-4 flex justify-between items-center bg-white px-1">
                    <div>
                      <span className="text-xs text-brand-accent uppercase font-bold tracking-wider">Unità Disponibile</span>
                      <p className="font-serif text-lg font-bold text-brand-dark">Prossima Consegna</p>
                    </div>
                    <div className="text-xs bg-brand-cream border border-brand-accent/20 px-3 py-1 rounded-full text-brand-medium">
                      Pedigree ROI
                    </div>
                  </div>
                </div>

                {/* Overlapping small circular badge */}
                <div className="absolute -bottom-6 -left-6 bg-brand-sage text-white p-4 rounded-full shadow-lg flex flex-col items-center justify-center w-24 h-24 rotate-12 select-none border-2 border-[#FAF7F2]">
                  <Heart className="w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center leading-tight mt-1">Svezzati in Casa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STANDARDS CARD SECTION */}
      <section className="bg-white py-16 md:py-24 border-y border-brand-accent/10" id="metodo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-accent block">Nessun compromesso sulla vita</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
              I 4 Pilastri della Filosofia Casa Terry
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto rounded-full mt-4"></div>
            <p className="text-brand-medium text-sm sm:text-base font-light">
              La nostra priorità assoluta è far nascere creature sane, robuste e felici che diventino l’anima della vostra casa. Svezziamo i cuccioli esclusivamente nel salone domestico, a contatto h24 con suoni, bambini e cure d’eccellenza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 leading-relaxed">
            {/* Pilastro 1 */}
            <div className="bg-[#FAF7F2] p-8 rounded-2xl border border-brand-accent/10 hover:shadow-md transition-shadow group">
              <div className="bg-brand-dark group-hover:bg-brand-accent text-brand-accent group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-3">Pedigree ROI / ENCI</h3>
              <p className="text-xs sm:text-sm text-brand-medium font-light">
                Ogni cucciolo esce provvisto del libretto genealogico ufficiale italiano. Tracciamo 5 generazioni libere da accoppiamenti consanguinei dannosi per la stabilità genetica.
              </p>
            </div>

            {/* Pilastro 2 */}
            <div className="bg-[#FAF7F2] p-8 rounded-2xl border border-brand-accent/10 hover:shadow-md transition-shadow group">
              <div className="bg-brand-dark group-hover:bg-brand-accent text-brand-accent group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-3">Salute Certificata</h3>
              <p className="text-xs sm:text-sm text-brand-medium font-light">
                Tutti i riproduttori sono lastrati ufficialmente per la displasia alle anche e gomiti (Celemasche) e certificati FSA per la lussazione delle rotule e oculopatie.
              </p>
            </div>

            {/* Pilastro 3 */}
            <div className="bg-[#FAF7F2] p-8 rounded-2xl border border-brand-accent/10 hover:shadow-md transition-shadow group">
              <div className="bg-brand-dark group-hover:bg-brand-accent text-brand-accent group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-3">Protocollo Biosens</h3>
              <p className="text-xs sm:text-sm text-brand-medium font-light">
                Iniziamo dal 3° giorno di vita stimoli sensoriali mirati. I nostri cuccioli non manifestano ansia da separazione o ipersensibilità ai rumori urbani (tuoni, clacson, traffico).
              </p>
            </div>

            {/* Pilastro 4 */}
            <div className="bg-[#FAF7F2] p-8 rounded-2xl border border-brand-accent/10 hover:shadow-md transition-shadow group">
              <div className="bg-brand-dark group-hover:bg-brand-accent text-brand-accent group-hover:text-white w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors shadow-sm">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-3">Corredo Puppy Kit</h3>
              <p className="text-xs sm:text-sm text-brand-medium font-light">
                Ti guidiamo passo dopo passo. Il cucciolo ti verrà consegnato munito del nostro Kit Esclusivo per consentire una transizione soffice e priva di stress intestinale nella nuova dimora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE MAIN PUPPIES GALLERY SECTION */}
      <section className="py-20 md:py-28" id="cuccioli">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-accent block">Presentazione Cucciolate</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
                I Nostri Preziosi Cuccioli
              </h2>
              <p className="text-brand-medium text-sm sm:text-base font-light max-w-xl">
                Ogni cucciolo è un capolavoro creato con dignità ed etica canina. Clicca sulla scheda del singolo piccolo per visualizzare ulteriori foto, dettagli sanitari reali e lignaggio genitori.
              </p>
            </div>

            {/* Quick Status legend */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Disponibile
              </span>
              <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Richiedi Info
              </span>
              <span className="text-xs bg-amber-50/40 text-brand-accent-dark border border-brand-accent/20 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
                In Famiglia
              </span>
              <span className="text-xs bg-gray-100 text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Già Ceduto/a
              </span>
            </div>
          </div>

          {/* Elegant Filter System with dynamic design */}
          <div className="bg-white p-4 rounded-2xl border border-brand-accent/15 mb-10 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Filter by breed */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {["Tutti", "Barboncino"].map((breed) => (
                <button
                  key={breed}
                  onClick={() => setFilterBreed(breed)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                    filterBreed === breed 
                      ? "bg-brand-dark text-white shadow-md shadow-brand-dark/10" 
                      : "bg-[#FAF7F2] hover:bg-brand-accent-light text-brand-medium hover:text-brand-dark"
                  }`}
                >
                  {breed === "Tutti" ? "Tutte le razze" : breed}
                </button>
              ))}
            </div>

            {/* Filter by status */}
            <div className="flex bg-brand-cream p-1 rounded-lg border border-brand-accent/10 w-full sm:w-auto overflow-x-auto">
              {["Tutti", "Disponibili", "In Famiglia", "Ceduti"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 flex-1 sm:flex-initial cursor-pointer whitespace-nowrap ${
                    filterStatus === status 
                      ? "bg-white text-brand-dark font-bold shadow-sm" 
                      : "text-brand-medium hover:text-brand-dark"
                  }`}
                >
                  {status === "Tutti" ? "Ogni Stato" : status}
                </button>
              ))}
            </div>
          </div>

          {/* Puppy Cards Grid Grid with smooth layout animation entry */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            id="puppies-grid-container"
          >
            <AnimatePresence mode="popLayout">
              {filteredPuppies.length > 0 ? (
                filteredPuppies.map((puppy) => {
                  // status colors styling
                  const statusStyles = {
                    disponibile: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    prenotabile: "bg-amber-50 text-amber-700 border-amber-200",
                    in_arrivo: "bg-sky-50 text-sky-700 border-sky-200",
                    in_famiglia: "bg-amber-50/40 text-brand-accent-dark border-brand-accent/20",
                    adottato: "bg-gray-100 text-gray-500 border-gray-200"
                  };
                  
                  const statusLabel = {
                    disponibile: "Disponibile subito",
                    prenotabile: "Richiedi Info",
                    in_arrivo: "In arrivo",
                    in_famiglia: "In Famiglia (Non in vendita)",
                    adottato: "Ceduto/a"
                  };

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={puppy.id}
                      onClick={() => {
                        setSelectedPuppy(puppy);
                        setLightboxIndex(0);
                      }}
                      className="bg-white rounded-2xl overflow-hidden border border-brand-accent/15 hover:shadow-xl hover:border-brand-accent/45 transition-all duration-300 group cursor-pointer flex flex-col h-full"
                    >
                      {/* Image Frame */}
                      <div className="aspect-[4/3] relative w-full overflow-hidden bg-brand-accent-light">
                        <Image
                          src={puppy.imgUrl}
                          alt={`${puppy.breed} ${puppy.name}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Breed & Sex Tags */}
                        <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                          <span className="bg-brand-dark/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded">
                            {puppy.breed}
                          </span>
                          <span className={`text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded text-white ${puppy.sex === "Maschio" ? "bg-blue-600/80" : "bg-pink-600/80"}`}>
                            {puppy.sex}
                          </span>
                        </div>

                        {/* Status tag */}
                        <div className="absolute bottom-4 right-4 animate-fade-in">
                          <span className={`text-xs font-bold border px-3 py-1.5 rounded-full backdrop-blur-md ${statusStyles[puppy.status] || "bg-white text-brand-dark"}`}>
                            {statusLabel[puppy.status]}
                          </span>
                        </div>
                      </div>

                      {/* Card Content info */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-baseline mb-2">
                            <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                              {puppy.name}
                            </h3>
                            <span className="text-xs text-brand-accent font-medium uppercase tracking-widest bg-brand-cream border border-brand-accent/20 px-2 py-0.5 rounded">
                              {puppy.breedDetail}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-xs text-brand-medium mb-4">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Nato il: <strong>{puppy.birthDate}</strong></span>
                          </div>

                          <p className="text-brand-medium text-xs sm:text-sm line-clamp-3 mb-5 font-light leading-relaxed">
                            {puppy.description}
                          </p>
                        </div>

                        <div>
                          {/* Character Traits badges */}
                          <div className="flex flex-wrap gap-1 mb-5">
                            {puppy.character.map((char) => (
                              <span key={char} className="bg-brand-cream text-brand-medium border border-brand-accent/10 px-2 py-1 rounded text-[10px] font-medium">
                                • {char}
                              </span>
                            ))}
                          </div>

                          {/* Action Bar */}
                          <div className="pt-4 border-t border-brand-accent/10 flex justify-between items-center">
                            <span className="text-xs text-brand-accent hover:underline font-bold flex items-center gap-1">
                              Scheda Dettagliata
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {puppy.status === "in_famiglia" ? (
                              <a
                                href={`https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Ho%20visto%20il%20vostro%20splendido%20soggetto%20${puppy.name}%20sul%20sito.%20Mi%20piacerebbe%20ricevere%20informazioni%20sulle%20prossime%20cucciolate%20di%20questa%20linea.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded-lg flex items-center justify-center shadow-sm cursor-pointer transition-colors"
                                title="Chiedi informazioni sulle future cucciolate"
                              >
                                <MessageCircle className="w-4 h-4 fill-white" />
                              </a>
                            ) : puppy.status !== "adottato" ? (
                              <a
                                href={`https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Siamo%20innamorati%20di%20${puppy.name},%20splendido%20Barboncino/${puppy.breed}%20nato%20il%20${puppy.birthDate}.%20%C3%88%20ancora%20disponibile?%20Vorremmo%20un%20appuntamento.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded-lg flex items-center justify-center shadow-sm cursor-pointer transition-colors"
                                title="Chiedi informazioni via Whatsapp"
                              >
                                <MessageCircle className="w-4 h-4 fill-white" />
                              </a>
                            ) : (
                              <span className="text-xs text-brand-medium italic">Ceduto a famiglia</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center text-brand-medium bg-white rounded-3xl border border-brand-accent/10">
                  <Search className="w-8 h-8 text-brand-accent mx-auto mb-4" />
                  <p className="font-serif text-lg font-bold">Nessun cucciolo corrispondente ai criteri</p>
                  <p className="text-xs font-light mt-1">Prova a cambiare filtri o contattaci via WhatsApp per aggiornamenti in tempo reale.</p>
                  <button 
                    onClick={() => { setFilterBreed("Tutti"); setFilterStatus("Tutti"); }}
                    className="mt-6 bg-brand-dark text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer hover:bg-brand-medium"
                  >
                    Resetta Filtri
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* IMMERSIVE MOOD-FIRST PORTRAIT LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPuppy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/85 backdrop-blur-md z-99 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPuppy(null)}
            id="puppy-lightbox-modal"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-[#FAF7F2] rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl border border-brand-accent/20 cursor-default max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside modal */}
              <div className="p-4 bg-brand-dark text-white flex justify-between items-center sm:hidden">
                <span className="font-serif text-lg font-bold">{selectedPuppy.name}</span>
                <button 
                  onClick={() => setSelectedPuppy(null)}
                  className="p-1.5 hover:bg-white/10 rounded-full text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto flex-1">
                {/* Images and Slider Column */}
                <div className="bg-brand-dark flex flex-col justify-center relative p-2 sm:p-6">
                  {/* Close button desktop */}
                  <button 
                    onClick={() => setSelectedPuppy(null)}
                    className="absolute top-4 right-4 hidden sm:flex items-center justify-center bg-brand-cream/10 hover:bg-brand-cream/25 hover:scale-105 active:scale-95 text-white p-2.5 rounded-full transition-all z-10 cursor-pointer"
                    aria-label="Chiudi"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg bg-black/40">
                    <Image
                      src={lightboxIndex === 0 ? selectedPuppy.imgUrl : selectedPuppy.additionalImages[lightboxIndex - 1]}
                      alt={`${selectedPuppy.name} close up`}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Carousel Indicators */}
                  <div className="flex gap-2 justify-center mt-4">
                    <button
                      onClick={() => setLightboxIndex(0)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${lightboxIndex === 0 ? "w-6 bg-brand-accent" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
                    ></button>
                    {selectedPuppy.additionalImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setLightboxIndex(i + 1)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${lightboxIndex === i + 1 ? "w-6 bg-brand-accent" : "w-2.5 bg-white/40"}`}
                      ></button>
                    ))}
                  </div>

                  {/* Preloaded thumbnails */}
                  <div className="flex gap-2.5 justify-center mt-3">
                    <div 
                      onClick={() => setLightboxIndex(0)}
                      className={`w-14 h-11 relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${lightboxIndex === 0 ? "border-brand-accent scale-105" : "border-transparent opacity-55"}`}
                    >
                      <Image src={selectedPuppy.imgUrl} alt="Thumbnail 1" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    {selectedPuppy.additionalImages.map((img, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setLightboxIndex(idx + 1)}
                        className={`w-14 h-11 relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${lightboxIndex === idx + 1 ? "border-brand-accent scale-105" : "border-transparent opacity-55"}`}
                      >
                        <Image src={img} alt={`Thumbnail ${idx + 2}`} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details text column */}
                <div className="p-6 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Breadcrumbs / tags */}
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div className="flex gap-2">
                        <span className="bg-brand-accent/20 text-brand-accent-dark text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                          {selectedPuppy.breed}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded text-white ${selectedPuppy.sex === "Maschio" ? "bg-blue-600/80" : "bg-pink-600/80"}`}>
                          {selectedPuppy.sex}
                        </span>
                      </div>
                      <span className="text-xs bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono">
                        ID: CT-{selectedPuppy.id.substring(0, 5)}
                      </span>
                    </div>

                    {/* Birth info & details */}
                    <div>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mb-1">
                        {selectedPuppy.name}
                      </h3>
                      <p className="text-brand-accent font-medium text-sm">
                        {selectedPuppy.breedDetail}
                      </p>
                    </div>

                    {/* Metadata boxes */}
                    <div className="grid grid-cols-2 gap-3.5 pt-1">
                      <div className="bg-brand-accent-light p-3 rounded-xl border border-brand-accent/15">
                        <span className="text-[10px] uppercase font-bold text-brand-accent text-brand-accent-dark tracking-wide block">Data di Nascita</span>
                        <p className="text-xs font-bold text-brand-dark mt-0.5">{selectedPuppy.birthDate}</p>
                      </div>
                      <div className="bg-brand-accent-light p-3 rounded-xl border border-brand-accent/15">
                        <span className="text-[10px] uppercase font-bold text-brand-accent text-brand-accent-dark tracking-wide block">Affido a Casa</span>
                        <p className="text-xs font-bold text-brand-dark mt-0.5">Dal {selectedPuppy.availableFrom}</p>
                      </div>
                    </div>

                    {/* Paragraph */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-xs text-brand-medium uppercase tracking-wider">Breve Descrizione</h4>
                      <p className="text-brand-medium text-xs sm:text-sm font-light leading-relaxed">
                        {selectedPuppy.description}
                      </p>
                    </div>
                  </div>

                  {/* Whatsapp CTA bar */}
                  <div className="pt-8 mt-6 border-t border-brand-accent/10 flex flex-col gap-3">
                    {selectedPuppy.status === "in_famiglia" ? (
                      <>
                        <div className="bg-amber-50/50 border border-brand-accent/20 rounded-xl p-4 text-center">
                          <p className="text-xs font-bold text-brand-accent-dark uppercase tracking-wide mb-1">Cane di Famiglia (Allevamento)</p>
                          <p className="text-xs text-brand-medium font-light leading-relaxed">
                            Questo splendido soggetto vive stabilmente con noi in casa ed è parte integrante del nostro programma di selezione etica. <strong>Non è in vendita.</strong> Puoi contattarci per chiederci informazioni su future nascite imparentate.
                          </p>
                        </div>
                        <a
                          href={`https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Ho%20visto%20il%20vostro%20splendido%20soggetto%20${selectedPuppy.name}%20(${selectedPuppy.breedDetail}).%20Mi%20piacerebbe%20ricevere%20maggiori%20informazioni%20su%20quando%20saranno%20disponibili%20le%20prossime%20cucciolate%20imparentate.%20Grazie.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
                          id="lightbox-whatsapp-cta-button"
                        >
                          <MessageCircle className="w-5 h-5 fill-white" />
                          <span>CHIEDI PROSSIME CUCCIOLATE</span>
                        </a>
                      </>
                    ) : selectedPuppy.status !== "adottato" ? (
                      <>
                        <a
                          href={`https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Desidero%20riservare%20un%20appuntamento%20per%20conoscere%20il%20cucciolotto%20${selectedPuppy.name}%20(${selectedPuppy.breedDetail}).%20Potete%20mandarmi%20maggiori%20foto%20e%20prezzo?%20Grazie.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
                          id="lightbox-whatsapp-cta-button"
                        >
                          <MessageCircle className="w-5 h-5 fill-white" />
                          <span>CHIEDI INFO SU WHATSAPP RAPIDO</span>
                        </a>
                        <p className="text-[10px] text-center text-brand-medium font-light">
                          Il numero telefonico <strong className="font-semibold">388 2412052</strong> è attivo 24/7 per messaggi o chiamate conoscitive sul cucciolo.
                        </p>
                      </>
                    ) : (
                      <div className="bg-gray-100 border border-gray-200 text-gray-500 rounded-xl p-3 text-center text-xs font-semibold">
                        Questo splendido cucciolo è già felicemente ceduto alla sua nuova famiglia. Contattaci per cucciolate programmate della medesima linea genetica.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUIZ WIDGET - INTERACTIVE AND BESPOKE FINDER */}
      <section className="bg-brand-dark text-white py-20 divide-y md:py-28 relative" id="test">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.2em] block">Strumento Guidato</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Qual è la Razza Perfetta per la Tua Famiglia?
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-light">
              Rispondi a 4 semplici domande basate sul tuo tempo, abitazione ed allergie per scoprire quale delle nostre linee di cuccioli si integrerà armonicamente coi tuoi ritmi domestici.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Step 0: Initial Screen */}
            {quizStep === 0 && (
              <div className="text-center py-6 space-y-6">
                <div className="bg-brand-accent/20 text-brand-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Compass className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">Inizia il Test di Compatibilità</h3>
                  <p className="text-white/60 text-xs sm:text-sm font-light max-w-lg mx-auto">
                    Evitiamo adozioni impulsive. Questo piccolo algoritmo è elaborato con la nostra esperienza di allevatori per garantirti armonia vitale col tuo cane.
                  </p>
                </div>
                <button
                  onClick={() => setQuizStep(1)}
                  className="bg-brand-accent hover:bg-brand-accent-dark text-brand-dark hover:text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-xs sm:text-sm tracking-wide"
                >
                  SCOPRI IL TUO MATCH IDEALE
                </button>
              </div>
            )}

            {/* Steps 1-4: Questions */}
            {quizStep > 0 && quizStep <= quizQuestions.length && (
              <div className="space-y-8 animate-fade-in">
                {/* Progress bar */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent">
                    Domanda {quizStep} di {quizQuestions.length}
                  </span>
                  <span className="text-xs text-white/50">{Math.round((quizStep / quizQuestions.length) * 100)}% Completato</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-accent h-full transition-all duration-300"
                    style={{ width: `${(quizStep / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-lg sm:text-xl font-medium">
                    {quizQuestions[quizStep - 1].question}
                  </h3>
                  <div className="grid grid-cols-1 gap-3.5 pt-2">
                    {quizQuestions[quizStep - 1].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(quizQuestions[quizStep - 1].id, option.value)}
                        className="bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-brand-accent rounded-xl p-4 sm:p-5 text-left text-xs sm:text-sm font-medium transition-all cursor-pointer flex justify-between items-center group"
                      >
                        <span>{option.label}</span>
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-brand-accent group-hover:translate-x-1.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Back button */}
                <button
                  onClick={() => setQuizStep(quizStep - 1)}
                  className="text-xs text-white/40 hover:text-white underline cursor-pointer"
                >
                  Indietro
                </button>
              </div>
            )}

            {/* Step 5: Results */}
            {quizStep === quizQuestions.length + 1 && quizResult && (
              <div className="animate-fade-in space-y-6 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-8 items-center py-4">
                {/* Result image */}
                <div className="col-span-4 aspect-square relative rounded-2xl overflow-hidden bg-brand-accent-light mb-6 sm:mb-0 shadow-lg leading-none border border-white/10">
                  <Image 
                    src={quizResult.img} 
                    alt="Cane compatibile" 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Result text */}
                <div className="col-span-8 space-y-5 text-left">
                  <span className="text-[10px] uppercase font-bold text-brand-accent tracking-widest block">Il vostro compagno perfetto è...</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-none">
                    {quizResult.breed}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
                    {quizResult.text}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://wa.me/393882412052?text=${encodeURIComponent(quizResult.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba59] text-brand-dark hover:text-white font-bold py-3 px-5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md hover:shadow-emerald-900/30 font-bold"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>CHIEDI CUCCIOLI DISPONIBILI SUBITO</span>
                    </a>
                    
                    <button
                      onClick={resetQuiz}
                      className="border border-white/25 hover:border-white text-white/80 hover:text-white py-3 px-5 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                    >
                      Rifai il Test
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* TIMELINE OF ADOPTION percorso */}
      <section className="bg-white py-20 md:py-28 border-y border-brand-accent/10" id="percorso">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-accent block">Step-By-Step</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              Il Vostro Percorso di Adozione
            </h2>
            <p className="text-brand-medium text-xs sm:text-sm font-light">
              Non consegniamo cani a chiunque. Desideriamo tracciare un cammino consapevole che preparerà voi ed il cucciolo all’armonica convivenza h24.
            </p>
          </div>

          <div className="relative border-l-2 border-brand-accent/20 pl-6 sm:pl-8 space-y-12 ml-4">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-11 sm:-left-13 top-0 bg-brand-dark text-brand-accent w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-xs shadow-md border-2 border-white">1</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-dark">Contattaci per Conoscerci</h3>
                <p className="text-brand-medium text-xs sm:text-sm font-light mt-1 max-w-3xl leading-relaxed">
                  Invia una richiesta direttamente al numero telefonico <a href="https://wa.me/393882412052" className="text-brand-accent font-bold hover:underline">388 2412052</a> tramite chiamata o WhatsApp. Vi faremo una breve conversazione conoscitiva per inquadrare le vostre abitudini domestiche e rispondere ad ogni quesito.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-11 sm:-left-13 top-0 bg-brand-dark text-brand-accent w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-xs shadow-md border-2 border-white">2</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-dark">Vista Guidata in Allevamento</h3>
                <p className="text-brand-medium text-xs sm:text-sm font-light mt-1 max-w-3xl leading-relaxed">
                  Fisseremo un appuntamento in loco dove sarete accolti calorosamente nei nostri spazi a Mercatino Conca, nelle Marche. Avrete modo di vedere dove vivono le madri, i padri ed assistere al fiero equilibrio dei piccoli.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-11 sm:-left-13 top-0 bg-brand-dark text-brand-accent w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-xs shadow-md border-2 border-white">3</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-dark">Richiesta Informazioni e Svezzamento</h3>
                <p className="text-brand-medium text-xs sm:text-sm font-light mt-1 max-w-3xl leading-relaxed">
                  Selezionato il cucciolo del cuore si procede alla richiesta di informazioni e di contatto. Nelle settimane successive vi invieremo continui aggiornamenti settimanali con foto e piccoli video delle sue tappe evolutive fondamentali.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <span className="absolute -left-11 sm:-left-13 top-0 bg-brand-dark text-brand-accent w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-xs shadow-md border-2 border-white">4</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-dark">Inoculazione Microchip e Consegna</h3>
                <p className="text-brand-medium text-xs sm:text-sm font-light mt-1 max-w-3xl leading-relaxed">
                  Al compimento del 80° giorno, completati vaccini, microchip, copia pedigree enci e visita veterinaria pre-affido con libretto, vi consegneremo il vostro tesoro di persona corredato dal fantastico Puppy Kit per i primi giorni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* COLLAPSIBLE ACCORDION FAQ */}
      <section className="bg-white py-20 md:py-28 border-t border-brand-accent/10 lg:divide-y" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-accent block">Chiarezza Totale</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              Domande Frequenti
            </h2>
            <p className="text-brand-medium text-xs sm:text-sm font-light">
              Tutte le risposte trasparenti per compiere un passo così importante con serenità e conoscenza delle leggi canore vigenti.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index}
                className="border border-brand-accent/15 rounded-2xl overflow-hidden bg-[#FAF7F2]"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-brand-cream/40 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="font-serif text-[15px] sm:text-base font-bold text-brand-dark pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-brand-accent shrink-0 transition-transform duration-300 ${faqOpen === index ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {faqOpen === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-brand-accent/10"
                    >
                      <div className="px-6 py-5 text-xs sm:text-sm text-brand-medium font-light leading-relaxed bg-[#FAFFFA]/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPREHENSIVE CONTACT & FORM SECTION */}
      <section className="py-20 md:py-28 relative" id="contatti">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-stretch">
            {/* Left Column Information */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-accent block mb-2">Canale Diretto</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                  Mettiti in Contatto
                </h2>
                <div className="w-16 h-0.5 bg-brand-accent mt-4"></div>
                <p className="text-brand-medium text-xs sm:text-sm font-light mt-4 leading-relaxed">
                  Siamo pronti ad accoglierti con cortesia e professionalità. Scegli il canale che preferisci. Per un contatto istantaneo e rapido, fai click sul numero del telefono per avviare subito la conversazione WhatsApp automatica.
                </p>
              </div>

              {/* Informative direct channels */}
              <div className="space-y-6 py-6 border-y border-brand-accent/15 leading-relaxed">
                {/* WHATSAPP CLICK FOR QUICK CONVo */}
                <a 
                  href="https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Vorrei%20ricevere%20informazioni%20veloci%20sulle%20prossime%20visite%20ed%20adozioni%20possibili."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 transition-colors cursor-pointer group"
                  id="direct-whatsapp-panel-link"
                >
                  <div className="bg-[#25D366] text-white p-3 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800">WhatsApp Chat Rapida (Cellulare)</span>
                    <p className="font-bold text-brand-dark text-base sm:text-lg group-hover:text-emerald-700 transition-colors">388 2412052</p>
                  </div>
                </a>

                {/* Email Channel */}
                <div className="flex items-center gap-4 p-2 sm:px-4">
                  <div className="bg-brand-dark text-brand-accent p-3.5 rounded-xl border border-brand-accent/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-medium">Scrivici una Mail</span>
                    <p className="font-semibold text-brand-dark text-xs sm:text-sm">
                      <a href="mailto:teresa1978@hotmail.it" className="hover:text-brand-accent transition-colors">
                        teresa1978@hotmail.it
                      </a>
                    </p>
                  </div>
                </div>

                {/* Physical Address */}
                <div className="flex items-center gap-4 p-2 sm:px-4">
                  <div className="bg-brand-dark text-brand-accent p-3.5 rounded-xl border border-brand-accent/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-medium">Sede Allevamento</span>
                    <p className="font-semibold text-brand-dark text-xs sm:text-sm">Via Tassona 17 A - Mercatino Conca (PU), Marche, Italia</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase font-bold text-brand-medium">Seguici per i video giornalieri:</span>
                <div className="flex gap-2">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-brand-cream border border-brand-accent/20 hover:border-brand-accent text-brand-medium hover:text-brand-accent p-2.5 rounded-full transition-all">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-brand-cream border border-brand-accent/20 hover:border-brand-accent text-brand-medium hover:text-brand-accent p-2.5 rounded-full transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Interactive Booking Form */}
            <div className="lg:col-span-7 mt-12 lg:mt-0">
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-brand-accent/15 shadow-xl">
                {!formSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-6" id="contact-booking-form">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">Richiedi una Richiamata</h3>
                      <p className="text-brand-medium text-xs font-light">Compila il modulo per ricevere dettagli catalogati completi.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-medium flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> Nome e Cognome
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-brand-accent/20 focus:border-brand-accent rounded-xl p-3 text-xs sm:text-sm focus:outline-none custom-ring"
                          placeholder="es. Mario Rossi"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-medium flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" /> Telefono Cellulare
                        </label>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-brand-accent/20 focus:border-brand-accent rounded-xl p-3 text-xs sm:text-sm focus:outline-none custom-ring"
                          placeholder="es. 347 1234567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-medium flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> Email
                        </label>
                        <input
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-brand-accent/20 focus:border-brand-accent rounded-xl p-3 text-xs sm:text-sm focus:outline-none custom-ring"
                          placeholder="mario.rossi@email.it"
                        />
                      </div>

                      {/* Select Breed of Choice */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brand-medium">{"Scegli la Razza d'interesse"}</label>
                        <select
                          value={formBreed}
                          onChange={(e) => setFormBreed(e.target.value)}
                          className="w-full bg-[#FAF7F2] border border-brand-accent/20 focus:border-brand-accent rounded-xl p-3 text-xs sm:text-sm focus:outline-none cursor-pointer focus:ring-1 focus:ring-brand-accent"
                        >
                          <option value="">Seleziona...</option>
                          <option value="Barboncino Toy Rosso / Fulvo">Barboncino Toy Rosso / Fulvo</option>
                          <option value="Barboncino Toy Albicocca / Apricot">Barboncino Toy Albicocca / Apricot</option>
                          <option value="Altro / Non ho preferenze">Altro / Non ho preferenze</option>
                        </select>
                      </div>
                    </div>

                    {/* Rich text messaging */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-brand-medium">Il vostro nucleo ed abitudini (Opzionale)</label>
                      <textarea
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-brand-accent/20 focus:border-brand-accent rounded-xl p-3 text-xs sm:text-sm focus:outline-none custom-ring resize-none leading-relaxed"
                        placeholder="Raccontaci brevemente della tua famiglia, se possedete già cani ed il tempo dedicato alla gestione domestica..."
                      ></textarea>
                    </div>

                    {/* Action button */}
                    <button
                      type="submit"
                      className="w-full bg-brand-dark hover:bg-brand-medium active:scale-[0.98] transition-all text-white py-3.5 rounded-xl text-xs sm:text-sm tracking-wide font-bold shadow-md cursor-pointer"
                    >
                      INVIA RICHIESTA INFORMAZIONI E CONTATTO
                    </button>
                    
                    <p className="text-[10px] text-brand-medium text-center font-light leading-relaxed">
                      Sotto tutela della privacy canina e personale. I vostri recapiti verranno usati esclusivamente da Filippo e Terry per contattarvi. Rispettiamo il codice GDPR.
                    </p>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                    id="form-success-state"
                  >
                    <div className="bg-brand-sage bg-opacity-15 text-brand-sage w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm border border-brand-sage/20">
                      <Check className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-brand-dark">Grazie Mille {formName}!</h3>
                      <p className="text-brand-medium text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
                        Abbiamo registrato con successo la vostra richiesta di informazioni. Uno dei nostri svezzatori (Filippo o Terry) vi richiamerà al cellulare <strong className="font-semibold">{formPhone}</strong> entro 4 ore.
                      </p>
                    </div>
                    
                    <div className="pt-6">
                      <a
                        href={`https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Sono%20${formName}%20ed%20ho%20appena%20inviato%20il%20modulo%20recapiti%20dal%20sito.%20Vorrei%20poter%20parlare%20con%20voi.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-6 rounded-xl text-xs items-center gap-2 cursor-pointer shadow transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>VELOCIZZA SU WHATSAPP ADESSO</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-[#D9CFC1] py-16 border-t border-white/[0.08]" id="footer-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Brand description */}
          <div className="space-y-4 md:col-span-1.5">
            <span className="font-serif text-2xl font-bold text-white block">Casa Terry</span>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
              Selezione di eccellenza canina e adozione protetta. Accompagniamo le famiglie in tutta Italia nella scelta responsabile del cucciolo, focalizzandoci su genetica certificata ed equilibrio nervoso bio-sensoriale.
            </p>
            <div className="text-[10px] text-white/40 space-y-1">
              <p>Allevamento Registrato ENCI • Affisso ROI</p>
              <p>P.IVA: IT04294820359 • Mercatino Conca (PU), Marche, Italia</p>
            </div>
          </div>

          {/* Col 2: Fast navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">Navigazione Rapida</h4>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm text-white/70">
              <a href="#cuccioli" className="hover:text-brand-accent transition-colors">La Galleria</a>
              <a href="#metodo" className="hover:text-brand-accent transition-colors">Il Nostro Metodo Etico</a>
              <a href="#test" className="hover:text-brand-accent transition-colors">Test del Cane Compatibile</a>
              <a href="#faq" className="hover:text-brand-accent transition-colors">Domande Frequenti</a>
            </div>
          </div>

          {/* Col 3: Direct contact details */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">Infoline Principale</h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-white/70 leading-relaxed">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                <p>Via Tassona 17 A <br /> Mercatino Conca (PU), Marche</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                <a href="mailto:teresa1978@hotmail.it" className="hover:text-brand-accent transition-colors">
                  teresa1978@hotmail.it
                </a>
              </div>
              {/* CLICK MOBILE NUMBER TO WHATSAPP DIRECT */}
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/393882412052?text=Ciao%20Allevamento%20Casa%20Terry!%20Desidero%20essere%20richiamato%20per%20la%20prossima%20cucciolata."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent hover:underline font-bold text-white text-sm"
                >
                  WhatsApp: 388 2412052
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: ENCI pedigree awareness */}
          <div className="space-y-4 rounded-xl bg-white/[0.03] p-5 border border-white/[0.05]">
            <Award className="w-7 h-7 text-brand-accent mb-2" />
            <h4 className="text-white text-xs uppercase font-bold tracking-wider">Garanzia ENCI Codice Etico</h4>
            <p className="text-white/60 text-[11px] font-light leading-relaxed">
              {"Sottoscriviamo integralmente il Codice Deontologico degli Allevatori dell'Ente Nazionale Cinofilia Italiana. Nessun commercio abusivo, cuccioli testati e cura permanente."}
            </p>
          </div>
        </div>

        {/* Floating bottom credits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
          <p>© 2026 Allevamento Casa Terry. Tutti i diritti riservati ai nostri cani.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Condizioni di Cessione</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

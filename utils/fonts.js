import {
  Alex_Brush,
  Amatic_SC,
  Anton,
  Bungee,
  Caveat,
  Cedarville_Cursive,
  Cormorant,
  Cousine,
  Crimson_Text,
  Dancing_Script,
  EB_Garamond,
  Fira_Code,
  Fredoka,
  Gloria_Hallelujah,
  IBM_Plex_Mono,
  Inconsolata,
  Indie_Flower,
  Inter,
  JetBrains_Mono,
  Lato,
  Lobster,
  Lora,
  Merriweather,
  Montserrat,
  Mulish,
  Noto_Serif,
  Nunito,
  Open_Sans,
  Oswald,
  Pacifico,
  Patrick_Hand,
  Playfair_Display,
  Poppins,
  PT_Mono,
  PT_Serif,
  Raleway,
  Righteous,
  Roboto,
  Roboto_Mono,
  Roboto_Slab,
  Sacramento,
  Satisfy,
  Shadows_Into_Light,
  Source_Code_Pro,
  Space_Mono,
  Style_Script,
  Ubuntu_Mono,
  Work_Sans,
  Yellowtail,
} from "next/font/google";

// Load all fonts in module scope
const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"], display: "swap" });
const roboto = Roboto({ weight: "400", subsets: ["latin"], display: "swap" });
const openSans = Open_Sans({ weight: "400", subsets: ["latin"], display: "swap" });
const lato = Lato({ weight: "400", subsets: ["latin"], display: "swap" });
const montserrat = Montserrat({ weight: "400", subsets: ["latin"], display: "swap" });
const poppins = Poppins({ weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ weight: "400", subsets: ["latin"], display: "swap" });
const raleway = Raleway({ weight: "400", subsets: ["latin"], display: "swap" });
const nunito = Nunito({ weight: "400", subsets: ["latin"], display: "swap" });
const mulish = Mulish({ weight: "400", subsets: ["latin"], display: "swap" });
const workSans = Work_Sans({ weight: "400", subsets: ["latin"], display: "swap" });

const playfairDisplay = Playfair_Display({ weight: "400", subsets: ["latin"], display: "swap" });
const merriweather = Merriweather({ weight: "400", subsets: ["latin"], display: "swap" });
const lora = Lora({ weight: "400", subsets: ["latin"], display: "swap" });
const ebGaramond = EB_Garamond({ weight: "400", subsets: ["latin"], display: "swap" });
const ptSerif = PT_Serif({ weight: "400", subsets: ["latin"], display: "swap" });
const notoSerif = Noto_Serif({ weight: "400", subsets: ["latin"], display: "swap" });
const crimsonText = Crimson_Text({ weight: "400", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant({ weight: "400", subsets: ["latin"], display: "swap" });

// Display Fonts
const bungee = Bungee({ weight: "400", subsets: ["latin"], display: "swap" });
const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const oswald = Oswald({ weight: "400", subsets: ["latin"], display: "swap" });
const righteous = Righteous({ weight: "400", subsets: ["latin"], display: "swap" });
const lobster = Lobster({ weight: "400", subsets: ["latin"], display: "swap" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], display: "swap" });
const fredoka = Fredoka({ weight: "400", subsets: ["latin"], display: "swap" });

// Handwritten Fonts
const caveat = Caveat({ weight: "400", subsets: ["latin"], display: "swap" });
const dancingScript = Dancing_Script({ weight: "400", subsets: ["latin"], display: "swap" });
const amaticSC = Amatic_SC({ weight: "400", subsets: ["latin"], display: "swap" });
const indieFlower = Indie_Flower({ weight: "400", subsets: ["latin"], display: "swap" });
const patrickHand = Patrick_Hand({ weight: "400", subsets: ["latin"], display: "swap" });
const sacramento = Sacramento({ weight: "400", subsets: ["latin"], display: "swap" });
const shadowsIntoLight = Shadows_Into_Light({ weight: "400", subsets: ["latin"], display: "swap" });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"], display: "swap" });
const alexBrush = Alex_Brush({ weight: "400", subsets: ["latin"], display: "swap" });

// Monospace Fonts
const firaCode = Fira_Code({ weight: "400", subsets: ["latin"], display: "swap" });
const jetBrainsMono = JetBrains_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
const sourceCodePro = Source_Code_Pro({ weight: "400", subsets: ["latin"], display: "swap" });
const inconsolata = Inconsolata({ weight: "400", subsets: ["latin"], display: "swap" });
const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
const cousine = Cousine({ weight: "400", subsets: ["latin"], display: "swap" });
const ptMono = PT_Mono({ weight: "400", subsets: ["latin"], display: "swap" });
const ubuntuMono = Ubuntu_Mono({ weight: "400", subsets: ["latin"], display: "swap" });

// Cursive Fonts

const YellowTail = Yellowtail({ weight: "400", subsets: ["latin"], display: "swap" });
const GloriaHallelujah = Gloria_Hallelujah({ weight: "400", subsets: ["latin"], display: "swap" });
const CedarvilleCursive = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const StyleScript = Style_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Map font keys to loaded fonts
export const fontMap = {
  // Serif Fonts
  "roboto-slab": { className: robotoSlab.className, fontFamily: "Roboto Slab, serif" },
  "playfair-display": {
    className: playfairDisplay.className,
    fontFamily: "Playfair Display, serif",
  },
  merriweather: { className: merriweather.className, fontFamily: "'Merriweather', serif" },
  lora: { className: lora.className, fontFamily: "'Lora', serif" },
  ptSerif: { className: ptSerif.className, fontFamily: "'PT Serif', serif" },
  notoSerif: { className: notoSerif.className, fontFamily: "'Noto Serif', serif" },
  crimsonText: { className: crimsonText.className, fontFamily: "'Crimson Text', serif" },
  cormorant: { className: cormorant.className, fontFamily: "'Cormorant', serif" },
  "eb-garamond": { className: ebGaramond.className, fontFamily: "'EB Garamond', serif" },

  // Sans-Serif Fonts
  roboto: { className: roboto.className, fontFamily: "Roboto, sans-serif" },
  "open-sans": { className: openSans.className, fontFamily: "Open Sans, sans-serif" },
  lato: { className: lato.className, fontFamily: "Lato, sans-serif" },
  montserrat: { className: montserrat.className, fontFamily: "Montserrat, sans-serif" },
  poppins: { className: poppins.className, fontFamily: "Poppins, sans-serif" },
  inter: { className: inter.className, fontFamily: "Inter, sans-serif" },
  raleway: { className: raleway.className, fontFamily: "Raleway, sans-serif" },
  nunito: { className: nunito.className, fontFamily: "Nunito, sans-serif" },
  mulish: { className: mulish.className, fontFamily: "Mulish, sans-serif" },
  workSans: { className: workSans.className, fontFamily: "WorkSans, sans-serif" },

  // Display Fonts
  bungee: { className: bungee.className, fontFamily: "Bungee, display" },
  anton: { className: anton.className, fontFamily: "Anton, display" },
  oswald: { className: oswald.className, fontFamily: "Oswald, display" },
  righteous: { className: righteous.className, fontFamily: "Righteous, display" },
  lobster: { className: lobster.className, fontFamily: "Lobster, display" },
  pacifico: { className: pacifico.className, fontFamily: "Pacifico, display" },
  fredoka: { className: fredoka.className, fontFamily: "Fredoka, display" },

  // Handwritten Fonts
  caveat: { className: caveat.className, fontFamily: "Caveat, handwriting" },
  "dancing-script": {
    className: dancingScript.className,
    fontFamily: "Dancing Script, handwriting",
  },
  "amatic-sc": { className: amaticSC.className, fontFamily: "Amatic SC, handwriting" },
  "indie-flower": { className: indieFlower.className, fontFamily: "Indie Flower, handwriting" },
  "patrick-hand": { className: patrickHand.className, fontFamily: "Patrick Hand, handwriting" },
  sacramento: { className: sacramento.className, fontFamily: "Sacramento, handwriting" },
  "shadows-into-light": {
    className: shadowsIntoLight.className,
    fontFamily: "Shadows Into Light, handwriting",
  },
  satisfy: { className: satisfy.className, fontFamily: "Satisfy, handwriting" },
  "alex-brush": { className: alexBrush.className, fontFamily: "Alex Brush, handwriting" },

  // Monospace Fonts
  "fira-code": { className: firaCode.className, fontFamily: "Fira Code, monospace" },
  "jetbrains-mono": { className: jetBrainsMono.className, fontFamily: "JetBrains Mono, monospace" },
  "source-code-pro": {
    className: sourceCodePro.className,
    fontFamily: "Source Code Pro, monospace",
  },
  inconsolata: { className: inconsolata.className, fontFamily: "Inconsolata, monospace" },
  "roboto-mono": { className: robotoMono.className, fontFamily: "Roboto Mono, monospace" },
  "space-mono": { className: spaceMono.className, fontFamily: "Space Mono, monospace" },
  "ibm-plex-mono": { className: ibmPlexMono.className, fontFamily: "IBM Plex Mono, monospace" },
  cousine: { className: cousine.className, fontFamily: "Cousine, monospace" },
  "pt-mono": { className: ptMono.className, fontFamily: "PT Mono, monospace" },
  "ubuntu-mono": { className: ubuntuMono.className, fontFamily: "Ubuntu Mono, monospace" },

  // Cursive Fonts

  Yellowtail: { className: YellowTail.className, fontFamily: "Yellowtail, cursive" },
  "gloria-hallelujah": {
    className: GloriaHallelujah.className,
    fontFamily: "Gloria Hallelujah, cursive",
  },
  "cedarville-cursive": {
    className: CedarvilleCursive.className,
    fontFamily: "Cedarville Cursive, cursive",
  },
  "style-script": {
    className: StyleScript.className,
    fontFamily: "Style Script, cursive",
  },
};

import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

const TypographyTheme = ({
  expandedThemeTypography,
  handleChangeThemeTypography,
  changeAppearanceData,
  handleChangeAppearance,
}) => {
  return (
    <div className="mt-5">
      <Accordion expanded={expandedThemeTypography} onChange={handleChangeThemeTypography}>
        <AccordionSummary
          expandIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" variant="h6" style={{ fontWeight: 600 }}>
            Typography setting
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="my-2">Typography font</div>
            <select
              id="profile_border_style"
              name="profile_border_style"
              value={changeAppearanceData?.typography_font}
              onChange={(e) => handleChangeAppearance(e.target.value, "typography_font")}
              className="w-full mx-auto bg-transparent rounded-md border border-gray-300 focus:border-black focus:ring-0 text-sm outline-none text-gray-700 py-[10px] px-4 leading-8 transition-colors duration-200 ease-in-out"
            >
              <option value="roboto-slab" style={{ fontFamily: "Roboto Slab, serif" }}>
                roboto-slab
              </option>
              <option value="playfair-display" style={{ fontFamily: "Playfair Display, serif" }}>
                playfair-display
              </option>
              <option value="merriweather" style={{ fontFamily: "'Merriweather', serif" }}>
                merriweather
              </option>
              <option value="lora" style={{ fontFamily: "'Lora', serif" }}>
                lora
              </option>
              <option value="eb-garamond" style={{ fontFamily: "'EB Garamond', serif" }}>
                eb-garamond
              </option>
              <option value="PT Serif" style={{ fontFamily: "'PT Serif', serif" }}>
                PT Serif
              </option>
              <option value="Noto Serif" style={{ fontFamily: "'Noto Serif', serif" }}>
                Noto Serif
              </option>
              <option value="Crimson Text" style={{ fontFamily: "'Crimson Text', serif" }}>
                Crimson Text
              </option>
              <option value="cormorant" style={{ fontFamily: "'Cormorant', serif" }}>
                cormorant
              </option>
              <option value="roboto" style={{ fontFamily: "Roboto, sans-serif" }}>
                roboto
              </option>
              <option value="open-sans" style={{ fontFamily: "Open Sans, sans-serif" }}>
                open-sans
              </option>
              <option value="lato" style={{ fontFamily: "Lato, sans-serif" }}>
                lato
              </option>
              <option value="montserrat" style={{ fontFamily: "Montserrat, sans-serif" }}>
                montserrat
              </option>
              <option value="poppins" style={{ fontFamily: "Poppins, sans-serif" }}>
                poppins
              </option>
              <option value="inter" style={{ fontFamily: "Inter, sans-serif" }}>
                inter
              </option>
              <option value="raleway" style={{ fontFamily: "Raleway, sans-serif" }}>
                raleway
              </option>
              <option value="nunito" style={{ fontFamily: "Nunito, sans-serif" }}>
                nunito
              </option>
              <option value="mulish" style={{ fontFamily: "Mulish, sans-serif" }}>
                mulish
              </option>
              <option value="bungee" style={{ fontFamily: "Bungee, display" }}>
                bungee
              </option>
              <option value="anton" style={{ fontFamily: "Anton, display" }}>
                anton
              </option>
              <option value="oswald" style={{ fontFamily: "Oswald, display" }}>
                oswald
              </option>
              <option value="righteous" style={{ fontFamily: "Righteous, display" }}>
                righteous
              </option>
              <option value="lobster" style={{ fontFamily: "Lobster, display" }}>
                lobster
              </option>
              <option value="pacifico" style={{ fontFamily: "Pacifico, display" }}>
                pacifico
              </option>
              <option value="fredoka" style={{ fontFamily: "Fredoka, display" }}>
                fredoka
              </option>
              <option value="caveat" style={{ fontFamily: "Caveat, handwriting" }}>
                caveat
              </option>
              <option value="dancing-script" style={{ fontFamily: "Dancing Script, handwriting" }}>
                dancing-script
              </option>
              <option value="amatic-sc" style={{ fontFamily: "Amatic SC, handwriting" }}>
                amatic-sc
              </option>
              <option value="indie-flower" style={{ fontFamily: "Indie Flower, handwriting" }}>
                indie-flower
              </option>
              <option value="patrick-hand" style={{ fontFamily: "Patrick Hand, handwriting" }}>
                patrick-hand
              </option>
              <option value="sacramento" style={{ fontFamily: "Sacramento, handwriting" }}>
                sacramento
              </option>
              <option
                value="shadows-into-light"
                style={{ fontFamily: "Shadows Into Light, handwriting" }}
              >
                shadows-into-light
              </option>
              <option value="satisfy" style={{ fontFamily: "Satisfy, handwriting" }}>
                satisfy
              </option>
              <option value="alex-brush" style={{ fontFamily: "Alex Brush, handwriting" }}>
                alex-brush
              </option>
              <option value="fira-code" style={{ fontFamily: "Fira Code, monospace" }}>
                fira-code
              </option>
              <option value="jetbrains-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                jetbrains-mono
              </option>
              <option value="source-code-pro" style={{ fontFamily: "Source Code Pro, monospace" }}>
                source-code-pro
              </option>
              <option value="inconsolata" style={{ fontFamily: "Inconsolata, monospace" }}>
                inconsolata
              </option>
              <option value="roboto-mono" style={{ fontFamily: "Roboto Mono, monospace" }}>
                roboto-mono
              </option>
              <option value="space-mono" style={{ fontFamily: "Space Mono, monospace" }}>
                space-mono
              </option>
              <option value="ibm-plex-mono" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                ibm-plex-mono
              </option>
              <option value="cousine" style={{ fontFamily: "Cousine, monospace" }}>
                cousine
              </option>
              <option value="pt-mono" style={{ fontFamily: "PT Mono, monospace" }}>
                pt-mono
              </option>
              <option value="ubuntu-mono" style={{ fontFamily: "Ubuntu Mono, monospace" }}>
                ubuntu-mono
              </option>
              <option value="Yellowtail" style={{ fontFamily: "Yellowtail, cursive" }}>
                Yellowtail
              </option>
              <option
                value="gloria-hallelujah"
                style={{ fontFamily: "Gloria Hallelujah, cursive" }}
              >
                Gloria Hallelujah
              </option>
              <option
                value="cedarville-cursive"
                style={{ fontFamily: "Cedarville Cursive, cursive" }}
              >
                Cedarville Cursive
              </option>
              <option value="style-script" style={{ fontFamily: "Style Script, cursive" }}>
                Style Script
              </option>
            </select>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TypographyTheme;

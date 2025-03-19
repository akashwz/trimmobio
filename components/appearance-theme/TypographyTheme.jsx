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
              <optgroup label="Serif Fonts">
                <option value="Roboto Slab, serif" style={{ fontFamily: "Roboto Slab, serif" }}>
                  roboto-slab
                </option>
                <option
                  value="playfair-displayPlayfair Display, serif"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  playfair-display
                </option>
                <option
                  value="'Merriweather', serif"
                  style={{ fontFamily: "'Merriweather', serif" }}
                >
                  merriweather
                </option>
                <option value="'Lora', serif" style={{ fontFamily: "'Lora', serif" }}>
                  lora
                </option>
                <option value="'EB Garamond', serif" style={{ fontFamily: "'EB Garamond', serif" }}>
                  eb-garamond
                </option>
                <option value="'PT Serif', serif" style={{ fontFamily: "'PT Serif', serif" }}>
                  PT Serif
                </option>
                <option value="'Noto Serif', serif" style={{ fontFamily: "'Noto Serif', serif" }}>
                  Noto Serif
                </option>
                <option
                  value="'Crimson Text', serif"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  Crimson Text
                </option>
                <option value="'Cormorant', serif" style={{ fontFamily: "'Cormorant', serif" }}>
                  cormorant
                </option>
              </optgroup>

              <optgroup label="Sans-Serif Fonts">
                <option value="Roboto, sans-serif" style={{ fontFamily: "Roboto, sans-serif" }}>
                  roboto
                </option>
                <option
                  value="Open Sans, sans-serif"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  open-sans
                </option>
                <option value="Lato, sans-serif" style={{ fontFamily: "Lato, sans-serif" }}>
                  lato
                </option>
                <option
                  value="Montserrat, sans-serif"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  montserrat
                </option>
                <option value="Poppins, sans-serif" style={{ fontFamily: "Poppins, sans-serif" }}>
                  poppins
                </option>
                <option value="Inter, sans-serif" style={{ fontFamily: "Inter, sans-serif" }}>
                  inter
                </option>
                <option value="Raleway, sans-serif" style={{ fontFamily: "Raleway, sans-serif" }}>
                  raleway
                </option>
                <option value="Nunito, sans-serif" style={{ fontFamily: "Nunito, sans-serif" }}>
                  nunito
                </option>
                <option value="Mulish, sans-serif" style={{ fontFamily: "Mulish, sans-serif" }}>
                  mulish
                </option>
              </optgroup>

              <optgroup label="Display Fonts">
                <option value="Bungee, display" style={{ fontFamily: "Bungee, display" }}>
                  bungee
                </option>
                <option value="Anton, display" style={{ fontFamily: "Anton, display" }}>
                  anton
                </option>
                <option value="Oswald, display" style={{ fontFamily: "Oswald, display" }}>
                  oswald
                </option>
                <option value="Righteous, display" style={{ fontFamily: "Righteous, display" }}>
                  righteous
                </option>
                <option value="Lobster, display" style={{ fontFamily: "Lobster, display" }}>
                  lobster
                </option>
                <option value="Pacifico, display" style={{ fontFamily: "Pacifico, display" }}>
                  pacifico
                </option>
                <option value="Fredoka, display" style={{ fontFamily: "Fredoka, display" }}>
                  fredoka
                </option>
              </optgroup>

              <optgroup label="Handwriting Fonts">
                <option value="Caveat, handwriting" style={{ fontFamily: "Caveat, handwriting" }}>
                  caveat
                </option>
                <option
                  value="Dancing Script, handwriting"
                  style={{ fontFamily: "Dancing Script, handwriting" }}
                >
                  dancing-script
                </option>
                <option
                  value="Amatic SC, handwriting"
                  style={{ fontFamily: "Amatic SC, handwriting" }}
                >
                  amatic-sc
                </option>
                <option
                  value="Indie Flower, handwriting"
                  style={{ fontFamily: "Indie Flower, handwriting" }}
                >
                  indie-flower
                </option>
                <option
                  value="Patrick Hand, handwriting"
                  style={{ fontFamily: "Patrick Hand, handwriting" }}
                >
                  patrick-hand
                </option>
                <option
                  value="Sacramento, handwriting"
                  style={{ fontFamily: "Sacramento, handwriting" }}
                >
                  sacramento
                </option>
                <option
                  value="shadows-into-light"
                  style={{ fontFamily: "Shadows Into Light, handwriting" }}
                >
                  shadows-into-light
                </option>
                <option value="Satisfy, handwriting" style={{ fontFamily: "Satisfy, handwriting" }}>
                  satisfy
                </option>
                <option
                  value="Alex Brush, handwriting"
                  style={{ fontFamily: "Alex Brush, handwriting" }}
                >
                  alex-brush
                </option>
              </optgroup>

              <optgroup label="Monospace Fonts">
                <option value="Fira Code, monospace" style={{ fontFamily: "Fira Code, monospace" }}>
                  fira-code
                </option>
                <option
                  value="JetBrains Mono, monospace"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  jetbrains-mono
                </option>
                <option
                  value="Source Code Pro, monospace"
                  style={{ fontFamily: "Source Code Pro, monospace" }}
                >
                  source-code-pro
                </option>
                <option
                  value="Inconsolata, monospace"
                  style={{ fontFamily: "Inconsolata, monospace" }}
                >
                  inconsolata
                </option>
                <option
                  value="Roboto Mono, monospace"
                  style={{ fontFamily: "Roboto Mono, monospace" }}
                >
                  roboto-mono
                </option>
                <option
                  value="Space Mono, monospace"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  space-mono
                </option>
                <option
                  value="IBM Plex Mono, monospace"
                  style={{ fontFamily: "IBM Plex Mono, monospace" }}
                >
                  ibm-plex-mono
                </option>
                <option value="Cousine, monospace" style={{ fontFamily: "Cousine, monospace" }}>
                  cousine
                </option>
                <option value="PT Mono, monospace" style={{ fontFamily: "PT Mono, monospace" }}>
                  pt-mono
                </option>
                <option
                  value="Ubuntu Mono, monospace"
                  style={{ fontFamily: "Ubuntu Mono, monospace" }}
                >
                  ubuntu-mono
                </option>
              </optgroup>

              <optgroup label="Cursive Fonts">
                <option value="Yellowtail, cursive" style={{ fontFamily: "Yellowtail, cursive" }}>
                  Yellowtail
                </option>
                <option
                  value="Gloria Hallelujah, cursive"
                  style={{ fontFamily: "Gloria Hallelujah, cursive" }}
                >
                  Gloria Hallelujah
                </option>
                <option
                  value="Cedarville Cursive, cursive"
                  style={{ fontFamily: "Cedarville Cursive, cursive" }}
                >
                  Cedarville Cursive
                </option>
                <option
                  value="Style Script, cursive"
                  style={{ fontFamily: "Style Script, cursive" }}
                >
                  Style Script
                </option>
              </optgroup>
            </select>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TypographyTheme;

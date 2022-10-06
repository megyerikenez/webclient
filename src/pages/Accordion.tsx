import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";
import { Results as Segglyuk } from "../api";
import InnerResult from "../components/InnerResults";

interface IAccordionComponent {
  firstName?: string;
  timeSubmited?: string;
  lastName?: string;
  result?: Segglyuk;
}

export default function AccordionComponent(gecimre?: IAccordionComponent) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {gecimre?.firstName + " " + gecimre?.lastName}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {gecimre?.timeSubmited}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <InnerResult // TODO CSINALDD MEG GABOOOOOOOOOOOO
          toulousePieronResult={[]}
          chairLampResult={[]}
          bourdonResult={[]}
        />
      </AccordionDetails>
    </Accordion>
  );
}

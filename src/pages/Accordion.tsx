import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";
import { UserInfo } from "../api";
import { InnerResults } from "./Results";

export default function AccordionComponent(props: {user: UserInfo}) {
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
          {props.user.firstName + " " + props.user.lastName}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
         
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <InnerResults
          results={props.user.results}
        />
      </AccordionDetails>
    </Accordion>
  );
}

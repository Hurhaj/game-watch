import { Box } from "@chakra-ui/layout";
import React from "react";
import { AddInfoSource } from "../GameTile/AddInfoSource";
import { InfoSource } from "./InfoSource";
import { InfoSourceProvider } from "../../providers/InfoSourceProvider";
import { useGameContext } from "../../providers/GameProvider";


export const InfoSourceList: React.FC = () => {
    const { game, infoSources } = useGameContext();

    return (
        <InfoSourceProvider game={game}>
            <Box>{infoSources.map(source => <InfoSource key={source.id} source={source} />)}</Box>
            <AddInfoSource />
        </InfoSourceProvider>
    )
}
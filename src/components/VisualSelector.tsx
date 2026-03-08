import React from 'react';
import { FlowerOfLife } from './visuals/FlowerOfLife';
import { MetatronsCube } from './visuals/MetatronsCube';
import { SriYantra } from './visuals/SriYantra';
import { FibonacciSpiral } from './visuals/FibonacciSpiral';
import { SeedOfLife } from './visuals/SeedOfLife';
import { TorusKnot } from './visuals/TorusKnot';
import { MerkabaStar } from './visuals/MerkabaStar';
import { PlatonicMorph } from './visuals/PlatonicMorph';
import { VesicaPiscis } from './visuals/VesicaPiscis';
import { IcosahedronGlow } from './visuals/IcosahedronGlow';
import { DodecahedronGrid } from './visuals/DodecahedronGrid';
import { VectorEquilibrium } from './visuals/VectorEquilibrium';
import { Antahkarana } from './visuals/Antahkarana';
import { TreeOfLife } from './visuals/TreeOfLife';
import { HamsaHand } from './visuals/HamsaHand';
import { InfinityKnot } from './visuals/InfinityKnot';

interface VisualSelectorProps {
  index: number;
  dataArray: Uint8Array | null;
  isPreview: boolean;
}

export const VisualSelector = ({ index, dataArray, isPreview }: VisualSelectorProps) => {
  const props = { dataArray, isPreview };

  switch (index) {
    case 0: return <FlowerOfLife {...props} />;
    case 1: return <MetatronsCube {...props} />;
    case 2: return <SriYantra {...props} />;
    case 3: return <FibonacciSpiral {...props} />;
    case 4: return <SeedOfLife {...props} />;
    case 5: return <TorusKnot {...props} />;
    case 6: return <MerkabaStar {...props} />;
    case 7: return <PlatonicMorph {...props} />;
    case 8: return <VesicaPiscis {...props} />;
    case 9: return <IcosahedronGlow {...props} />;
    case 10: return <DodecahedronGrid {...props} />;
    case 11: return <VectorEquilibrium {...props} />;
    case 12: return <Antahkarana {...props} />;
    case 13: return <TreeOfLife {...props} />;
    case 14: return <HamsaHand {...props} />;
    case 15: return <InfinityKnot {...props} />;
    default: return <FlowerOfLife {...props} />;
  }
};

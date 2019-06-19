// -------------------------------------------------------------------------
// IMPORTS
// -------------------------------------------------------------------------

// Import React
import React from 'react';
// Material UI Imports
import { makeStyles, useTheme } from '@smartgear/edison';
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget,
  DefaultPortModel,
  DiagramProps,
} from "storm-react-diagrams";
import { useStore} from '../../hooks';
import { Divider } from '@material-ui/core';
import { SmartDASClientService } from '../../services/configured-services';
import Store, { StoreActions } from '../../store';
import { BreakerSetupObject } from '../../models';
import { AsyncSaveButton } from '../AsyncSaveButton';

require("storm-react-diagrams/dist/style.min.css");

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
  },
  diagram: {
    height: '700px',
    width: '730px',
    backgroundColor: theme.palette.grey[100]
  }
}));

// -------------------------------------------------------------------------
// OPTIONS
// -------------------------------------------------------------------------

export type WiringWizardDiagramProps = {
  onConfigSave?: (config: ReturnType<typeof getBreakerWiring>) => void
};

class BreakerNodeModel extends DefaultNodeModel {
  static isInstance(x: any) {
    return x instanceof BreakerNodeModel
  }
  public breakerIndex: number;
  constructor(name: string, color: string, breakerIndex: number) {
    super(name, color)
    this.breakerIndex = breakerIndex;
  }
}

class PLCInputNodeModel extends DefaultNodeModel {
  static isInstance(x: any) {
    return x instanceof PLCInputNodeModel
  }
  constructor(name: string, color: string) {
    super(name, color)
    this.updateDimensions({
      width: 200,
      height: 500,
    })
  }
}

class PLCOutputNodeModel extends DefaultNodeModel {
  static isInstance(x: any) {
    return x instanceof PLCOutputNodeModel
  }
  constructor(name: string, color: string) {
    super(name, color)
    this.updateDimensions({
      width: 200,
      height: 500,
    })
  }
}

function getBreakerWiring(model: DiagramModel) {
  type BreakerWiringMap = {
    breakerId: number;
    assosciatedInput: number;
    assosciatedOutput: number;
  };

  let breakerWiringMap = [] as BreakerWiringMap[];

  const breakers = Store.getState().breakers.List;



  breakers.forEach(breaker => {
    breakerWiringMap.push({
      breakerId: breaker.id,
      assosciatedInput: 0,
      assosciatedOutput: 0,
    })
  })


  Object.entries(model.links).forEach(([id, linkModel]) => {
    linkModel.points.forEach(point => {

      // point.getParent().
      console.log({ point })
      const {
        sourcePort,
        targetPort,
      } = point.parent;

      let breakerNode: BreakerNodeModel | null = null;

      let breakerIndex: number | null = null;
      let assosciatedInput: string | null = null;
      let assosciatedOutput: string | null = null;

      if (sourcePort && targetPort) {

        if (BreakerNodeModel.isInstance(sourcePort.parent)) {
          breakerNode = sourcePort.parent as BreakerNodeModel;
          breakerIndex = breakerNode.breakerIndex;

          if (PLCInputNodeModel.isInstance(targetPort.parent)) {
            assosciatedInput = (targetPort as DefaultPortModel).label
          }
          if (PLCOutputNodeModel.isInstance(targetPort.parent)) {
            assosciatedOutput = (targetPort as DefaultPortModel).label
          }
        } else if (targetPort.parent instanceof BreakerNodeModel) {
          breakerNode = targetPort.parent as BreakerNodeModel;
          breakerIndex = breakerNode.breakerIndex;

          if (PLCInputNodeModel.isInstance(sourcePort.parent)) {
            assosciatedInput = (sourcePort as DefaultPortModel).label
          }
          if (PLCOutputNodeModel.isInstance(sourcePort.parent)) {
            assosciatedOutput = (sourcePort as DefaultPortModel).label
          }

        }
      }

      if (breakerNode) {
        breakerIndex = breakerNode.breakerIndex;
      }

      if (breakerIndex) {
        let breakerWireMap: BreakerWiringMap;

        const ii = breakerWiringMap.findIndex(x => x.breakerId === breakerIndex);
        if (ii === -1) {
          breakerWireMap = {
            breakerId: breakerIndex,
            assosciatedInput: 0,
            assosciatedOutput: 0,
          };
        } else {
          breakerWireMap = breakerWiringMap[ii];
        }

        if (assosciatedInput !== null) {
          breakerWireMap.assosciatedInput = parseInt(assosciatedInput.slice(-1), 10);
        }

        if (assosciatedOutput !== null) {
          breakerWireMap.assosciatedOutput = parseInt(assosciatedOutput.slice(-1), 10);
        }

        if (ii === -1) {
          breakerWiringMap.push(breakerWireMap);
        } else {
          breakerWiringMap[ii] = breakerWireMap;
        }


      }
    })
  })

  return breakerWiringMap
}



// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------

export const WiringWizardDiagram: React.FC<WiringWizardDiagramProps> = props => {
  const theme = useTheme();
  const classes = useStyles();
  const breakers = useStore(state => state.breakers.List);
  //1) setup the diagram engine
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  //2) setup the diagram model
  const model = new DiagramModel();

  const state = {
    nodes: [] as DefaultNodeModel[],
    links: [] as LinkModel[],
  }

  async function handleSaveConfig() {
    const breakerWiringMap = getBreakerWiring(model);
    if (props.onConfigSave) {
      props.onConfigSave(breakerWiringMap);
    }

    const breakerUpdateRequests = [] as Array<Promise<BreakerSetupObject>>;
    breakerWiringMap.forEach(config => {
      const breaker = breakers.find(x => x.id === config.breakerId);
      if (breaker) {
        breaker.associatedInput = config.assosciatedInput;
        breaker.associatedOutput = config.assosciatedOutput;


        breakerUpdateRequests.push(
          SmartDASClientService.updateBreakerConfigByIndex(breaker.id, breaker)
        )
      }
    })

    try {
      const payloads = await Promise.all(breakerUpdateRequests);
      payloads.forEach(payload => {
        StoreActions.Breakers.updateOne(payload);
      });

    } catch (err) {
      console.error(err)
      return {
        isSuccess: false
      }
    }

    return {
      isSuccess: true
    }

  }

  const numberOfBreakers = breakers.length;

  //3-A) create a default node
  const assosciatedInputsNode = new PLCInputNodeModel("Assosciated Inputs", theme.palette.grey[500]);
  assosciatedInputsNode.setPosition(600, 175);

  const assosciatedOutputsNode = new PLCOutputNodeModel("Assosciated Outputs", theme.palette.grey[500]);
  assosciatedOutputsNode.setPosition(20, 175);


  const assosciationPorts = {
    inputs: [] as DefaultPortModel[],
    outputs: [] as DefaultPortModel[]
  }
  for (let i = 0; i < numberOfBreakers; i++) {
    assosciationPorts.inputs[i] = assosciatedInputsNode.addInPort(`Input ${i + 1}`)
    assosciationPorts.outputs[i] = assosciatedOutputsNode.addOutPort(`Output ${i + 1}`)
  }

  breakers.forEach((breaker, ii) => {
    // ADD BREAKER AS NODE
    const breakerNode = new BreakerNodeModel(`Breaker Number ${ii + 1}`, theme.palette.blues['800'], ii + 1);
    breakerNode.setPosition(300, 20 + 70 * ii);
    const outPort = breakerNode.addInPort(`Output`);
    const inPort = breakerNode.addOutPort(`Input`);



    if (breaker.associatedInput !== 0) {
      state.links.push(inPort.link(assosciationPorts.inputs[breaker.associatedInput - 1]))
    }

    if (breaker.associatedOutput !== 0) {
      state.links.push(outPort.link(assosciationPorts.outputs[breaker.associatedOutput - 1]))
    }

    state.nodes.push(breakerNode);
  })

  // //3-B) create another default node
  // const node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
  // const port2 = node2.addInPort("In");
  // node2.setPosition(400, 100);

  // // link the ports
  // const link1 = ports[0].link(port2);

  state.nodes.push(assosciatedInputsNode);
  state.nodes.push(assosciatedOutputsNode);


  state.nodes.forEach(node => {
    model.addNode(node);
  })

  state.links.forEach(link => {
    model.addLink(link);
  })

  state.nodes.forEach(node => {
    node.getInPorts().forEach(port => {
      port.addListener({
        selectionChanged: (event => console.log(event.entity))
      })
    })
    node.getOutPorts().forEach(port => {
      port.addListener({
        selectionChanged: (event => console.log(event.entity))
      })
    })
  })



  //5) load model into engine
  engine.setDiagramModel(model);


  const diagramProps: DiagramProps = {
    diagramEngine: engine,
    maxNumberPointsPerLink: 0,
    allowLooseLinks: false,
    // smartRouting: true,
  };



  //6) render the diagram!
  return (
    <div className={classes.root}>
      <DiagramWidget className={classes.diagram} {...diagramProps} />
      <Divider />
      <AsyncSaveButton onClick={handleSaveConfig}>
        Save Configuration
      </AsyncSaveButton>
    </div>
  )
};
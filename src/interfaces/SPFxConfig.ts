import { SPFI } from '@pnp/sp'
import { GraphFI } from '@pnp/graph'

interface PnPWrapper {
  sp: SPFI;
  graph: GraphFI;
  testSP?: () => Promise<boolean>
  testGRAPH?: () => Promise<boolean>
}

interface SPFxConfig {
  title: string;
  widgetsettings: string;
  editmode: boolean;
  isEditing: boolean;
  siteadmin: boolean;
  fullcontrol: boolean;
  displayname: string;
  loginname: string;
  instanceid: string;
  email: string;
  siteurl: string;
  weburl: string;
  siteid: string;
  webid: string;
  pnp: PnPWrapper;
  onPropertyChanged?: (propertyName: string, newValue: any) => void
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $spfxConfig: SPFxConfig
  }
}

export default SPFxConfig

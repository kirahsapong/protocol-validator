import Banner from "./components/Banner";
import CodeMirror from "@uiw/react-codemirror";
import { json } from '@codemirror/lang-json';
import { useMemo, useState } from "react";
import Checkmark from "./assets/checkmark.svg";
import Cross from "./assets/cross.svg";
import defaultProtocol from './assets/default-protocol.json';
import { type ProtocolDefinition, ProtocolActor, ProtocolAction, ProtocolRuleSetKeys } from './types/protocol';

const Validator = () => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [jsonValue, setJsonValue] = useState<ProtocolDefinition>(defaultProtocol);

  const handleJsonChange = (e: string) => {
    setJsonValue(JSON.parse(e))
  }

  const keyMaps = useMemo(() => {
    const listMap: Map<string, string[]> = new Map(); 
    const rolesMap: Map<string, boolean> = new Map(); 
    if (isValid) {
      const actions = Object.values(ProtocolAction).join(', ');
      const rules = Object.values(ProtocolRuleSetKeys).join(', ');

      Object.keys(jsonValue.types).map(type => {
        listMap.set(type, [`The owner can ${actions}`])
      })

      const mapStructure = (parentKeys: {[k: string]: unknown}) => {
        Object.keys(parentKeys).map(key => {
          const values = listMap.get(key) ?? []
  
          if (rules.includes(key)) {
            // then it's $role or $actions
            if (key == ProtocolRuleSetKeys.ROLE) {
              rolesMap.set(key, true)
            }
            if (key == ProtocolRuleSetKeys.ACTIONS) {
              // anyone
              // author
              // recipient
              // role
              const ruleActions: string[] = [];
              for (const action of parentKeys[key]) {
                if (action.who == ProtocolActor.Anyone) {
                  ruleActions.push(`Anyone can ${action.can.join(', ')}`)
                }
                if (action.who == ProtocolActor.Author) {
                  ruleActions.push(`The author of ${action.of} can ${action.can.join(', ')}`)
                }
                if (action.who == ProtocolActor.Recipient) {
                  ruleActions.push(`The recipient of ${action.of} can ${action.can.join(', ')}`)
                }
                if (action.role) {
                  ruleActions.push(`The ${action.role} role can ${action.can.join(', ')}`)
                }
              }
              listMap.set(key, values.concat(ruleActions))
            }
          } else {
            // get the keys of this key and recurse
            mapStructure(parentKeys[key])
          }
        })
      }
      mapStructure(jsonValue.structure);
    }
    return { listMap, rolesMap };
  }, [isValid, jsonValue])

  const banner = {
    heading: "DWN Protocol Validator",
    body: (
      <>
        <p>
          Decentralized Web Nodes are a DIF draft specification for 
          decentralized data storage and messaging.
        </p>
        <p>
          Explore, test, debug, and validate your DWN protocols for 
          interoperability across apps and nodes.
        </p>
        <div>
          <button>Learn more about DWNs</button>
          <button>See community protocols</button>
        </div>
      </>
    )
  }

  const section = {
    dropdown: (
      <div>
        <label htmlFor="method">Method</label>
        <select id="method">
          {
            [
              'Install',
              'Write',
              'Send',
              'Read'
            ].map((method, i) => <option key={i}>{method}</option>)
          }
        </select>
      </div>
    ),
    input: (
      <div>
        <CodeMirror
          value={JSON.stringify(jsonValue, null, 2)}
          onChange={handleJsonChange}
          height="100px"
          extensions={[json()]}
        />
        <button>Copy</button>
      </div>
    ),
    output: (
      <div>
        <div>
          <p>
            <img src={isValid ? Checkmark : Cross} alt="" />
            {isValid ? "Valid" : "Invalid"}
          </p>
        </div>
        <div>
          {isValid && (
            Object.keys(keyMaps.listMap).map(key => {
              keyMaps.listMap.get(key)
              return (
                <>
                  <code>{key}</code>
                  {!!keyMaps.rolesMap.get(key) && <span>Role</span>}
                  <ul>
                  {keyMaps.listMap.get(key)?.map(value => {
                      return (
                        <li>{value}</li>
                      )
                  })}
                  </ul>
                </>
              )
            })
            )
          }
        </div>
      </div>
    )
  }

  return (
    <>
      <Banner heading={banner.heading} body={banner.body}/>
      <main>
        <section>
          {section.dropdown}
          <div>
            {section.input}
            {section.output}
          </div>
        </section>
      </main> 
    </>
  )
}

export default Validator
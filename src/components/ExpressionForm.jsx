import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExpressionForm() {
    const [connector, setConnector] = useState('AND');
    const [rules, setRules] = useState([
      {
        key: "",
        output: {
          value: 0,
          operator: ">=",
          score: 0
        }
      }
    ]);
  
    const handleDropdownConnector = (e) => {
      setConnector(e.target.value);
    };
  
    const handleRuleFunction = (index, key, value) => {
      const tempRules = [...rules];
      if (key === "key") {
        tempRules[index][key] = value;
      } else {
        tempRules[index].output[key] = value;
      }
      setRules(tempRules);
    };
  
    const handleAddRule = () => {
      setRules((prevRules) => [
        ...prevRules,
        { key: "", output: { value: 0, operator: ">=", score: 0 } },
      ]);
    };
  
    const handleDeleteRule = (index) => {
      const updatedRules = [...rules];
      updatedRules.splice(index, 1);
      setRules(updatedRules);
    };
  
    return (
        
        <div className="container mt-4" style={{
            
            color: '#fff', // Optionally, set text color to white or a suitable contrast
            padding: '20px', // Optional padding for better readability
            borderRadius: '10px', // Optional border-radius for rounded corners
            boxShadow: '0 10px 10px rgba(0, 0, 0, 2)' // Optional box-shadow for depth
          }}>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="connector">Connector Type:</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="connector"
                  value={connector}
                  placeholder="Select an operator"
                  readOnly
                />
                
                  <select
                    className="custom-select"
                    value={connector}
                    onChange={handleDropdownConnector}
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                
              </div>
            </div>
          </div>
  
          {rules.map((rule, index) => (
            <div key={index} className="mb-3 border p-3">
              <div className="form-group">
                <label htmlFor={`ruleType${index}`} className="mb-1 m-2">Rule Type:</label>
                <select
                  className="custom-select"
                  id={`ruleType${index}`}
                  onChange={(e) => handleRuleFunction(index, "key", e.target.value)}
                >
                  <option value="age">Age</option>
                  <option value="credit score">Credit Score</option>
                  <option value="account balance">Account Balance</option>
                </select>
              </div>
  
              <label htmlFor={`operator${index}`} className="mt-2 m-2">Operator:</label>
              <select
                className="custom-select"
                value={rule.output.operator}
                onChange={(e) => handleRuleFunction(index, "operator", e.target.value)}
              >
                <option value=">">{'>'}</option>
                <option value="≥">{'≥'}</option>
                <option value="≤">{'≤'}</option>
                <option value="=">{'='}</option>
              </select>
  
              <div className="form-group mt-2">
                <label htmlFor={`value${index}`}>Value:</label>
                <input
                  type="text"
                  className="form-control"
                  value={rule.output.value}
                  onChange={(e) => handleRuleFunction(index, "value", e.target.value)}
                />
              </div>
  
              <label htmlFor={`score${index}`} className="mt-2">Score:</label>
              <input
                type="text"
                className="form-control"
                value={rule.output.score}
                onChange={(e) => handleRuleFunction(index, "score", e.target.value)}
              />
  
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-danger mr-2"
                  onClick={() => handleDeleteRule(index)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
  
          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-primary mt-3" onClick={handleAddRule}>
                ADD
              </button>
            </div>
          </div>
  
          <strong className="mt-3">Expected Output:</strong>
          <pre>{JSON.stringify({ rules, connector }, null, 2)}</pre>
        </form>
      </div>
    );
  }
  
  export default ExpressionForm;
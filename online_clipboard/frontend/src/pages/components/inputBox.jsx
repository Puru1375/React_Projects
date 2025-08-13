import { useState, useEffect } from 'react';

const InputBox = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [getKey, setKey] = useState('');
  const [getContent, setContent] = useState('');
  const [getCode, setCode] = useState('');
  const [getButtonText, setButtonText] = useState('');

  useEffect(() => {
    if (getContent === '' && getKey !== '') {
      setButtonText('Get Clip');
    } else if (getKey === '' && getContent !== '') {
      setButtonText('Send Clip');
    } else if (getKey === '' && getContent === '') {
      setButtonText('Please enter a key or content to proceed.');
    } else {
      setButtonText('You cannot set key.');
    }
  }, [getKey, getContent]);

  const handleClear = () => {
    if (getContent === '' && getKey === '' && getCode === '') {
      alert('Nothing to clear.');
    }

    setKey('');
    setContent('');
    setCode('');
  };

  function isOnlyNumbers(str) {
    return /^\d+$/.test(str);  // Matches only digits 0-9
  }

  const handleKeyChange = async (event) => {
    event.preventDefault();

    if (getCode === '') {
      return alert('Key_second must be provided.');
    } else if (!(getCode >= 0 && getCode <= 25)) {
      return alert('Key_second must be between 0 to 25.');
    }

    if (getContent === '' && getKey !== '') {
      try {
        const response = await fetch(`/api/clips/${getKey}`);
        const json = await response.json();
        console.log(json.clip.content);
        setContent(decrypt(json.clip.content, getCode));
        setKey('');
      } catch (error) {
        console.error('Error fetching clip:', error);
        alert(isOnlyNumbers(getKey) ? 'Invalid key. Please enter a valid key.' : 'Key must be a number.');
        setKey('');
      }
    } else if (getKey === '' && getContent === '') {
      alert('Please enter a key or content to proceed.');
    } else if (getKey === '' && getContent !== '') {
      try {
        const response = await fetch('/api/clips/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: encrypt(getContent, getCode) }),
        });
        const json = await response.json();
        console.log(json.clip.content, json.clip.key);
        setKey(json.clip.key);
        setContent('');
      } catch (error) {
        console.error('Error creating clip:', error);
        alert('Error creating clip. Please try again.');
      }
    } else {
      alert('You cannot set key.');
      setKey('');
    }
  };

  const handleCopy = (text) => {
    if (!text) {
      alert('Nothing to copy.');
      return;
    }
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  function encrypt(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      // XOR each character with the key character (repeated if needed)
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); // Convert to Base64 so it's safe for storage
  }

  function decrypt(encodedText, key) {
    let text = atob(encodedText); // Decode Base64
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          backgroundColor: '#77bbb0ff',
          padding: '15px',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          alignItems: 'center',
          width: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ position: 'relative', width: '20vw' }}>
            <input
              type="number"
              placeholder="key"
              onChange={(e) => setKey(e.target.value)}
              value={getKey || ''}
              style={{
                fontFamily: 'monospace',
                width: '20vw',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
              }}
            />
            <button
              onClick={() => handleCopy(getKey)}
              style={{
                position: 'absolute',
                top: '40%',
                right: '-15px',
                transform: 'translateY(-50%)',
                border: 'none',
                background: '#01297dff',
                color: 'white',
                padding: '5px 8px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              📋
            </button>
          </div>
          <input
            type="number"
            placeholder="code"
            onChange={(e) => setCode(e.target.value)}
            value={getCode}
            style={{
              fontFamily: 'monospace',
              width: '20vw',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          />
        </div>
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <textarea
            rows="4"
            placeholder="content"
            onChange={(e) => setContent(e.target.value)}
            value={getContent || ''}
            style={{
              width: '97%',
              height: '15vh',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          />
          <button
            onClick={() => handleCopy(getContent)}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '5px',
              border: 'none',
              background: '#01297dff',
              color: 'white',
              padding: '5px 8px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            📋
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >

          <button
            style={{
              fontFamily: 'monospace',
              backgroundColor: isHovered ? '#0043e0ff' : '#01297dff', // hover color
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '17px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleKeyChange}
          >
            {getButtonText}
          </button>
          <button
            style={{
              fontFamily: 'monospace',
              backgroundColor: '#01297dff', // hover color
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBox;

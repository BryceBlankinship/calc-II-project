import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppShell, Button, MantineProvider, Navbar, Header, MultiSelect, Text, TextInput, Image, NumberInput, Indicator, Card, Divider, ScrollArea } from '@mantine/core';
import integral from './assets/integral.svg';
import './app.css';

export default function App() {
    const options = [
        { label: 'Midpoint Method', value: 0 },
        { label: 'Trapezoid Method', value: 1 },
        { label: 'Simpson Method', value: 2 },
    ]

    const [method, setMethod] = useState();
    const [expression, setExpression] = useState('');
    const [precision, setPrecision] = useState('');
    const [upperLimit, setUpperLimit] = useState('');
    const [lowerLimit, setLowerLimit] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [showSimpsonWarning, setShowSimpsonWarning] = useState(false);
    const [solution, setSolution] = useState('');

    useEffect(() => {
        if (method !== undefined) {
            if (method[0] === 2) {
                setShowSimpsonWarning(true);
            } else {
                setShowSimpsonWarning(false);
            }
        }
    }, [method]);

    const handleMidpoint = async () => {
        const res = await axios.post('/midpoint', {
            fx: expression.toString(),
            a: lowerLimit,
            b: upperLimit,
            n: precision
        })

        setSolution(res.data.solution);
    }

    const handleTrapezoid = async () => {
        const res = await axios.post('/trapezoid', {
            fx: expression.toString(),
            a: lowerLimit,
            b: upperLimit,
            n: precision
        })

        setSolution(res.data.solution);
    }

    const handleSimpson = async () => {
        const res = await axios.post('/simpson', {
            fx: expression.toString(),
            a: lowerLimit,
            b: upperLimit,
            n: precision
        })

        setSolution(res.data.solution);
    }

    const handleClick = () => {
        if (method == undefined) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 5000);
        } else if (method[0] === 0) {
            handleMidpoint();
        } else if (method[0] === 1) {
            handleTrapezoid();
        } else if (method[0] === 2) {
            handleSimpson();
        } else {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 5000);
        }
    }

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>

            <AppShell
                padding="md"
                header={<Header height={60}><HeaderContent /></Header>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}>

                <div className="main-container">
                    <div className="integral-container">
                        <TextInput w={50} placeholder='b' value={upperLimit} onChange={e => setUpperLimit(e.currentTarget.value)} />
                        <Image src={integral} width={100} />
                        <TextInput w={50} placeholder='a' value={lowerLimit} onChange={e => setLowerLimit(e.currentTarget.value)} />
                    </div>

                    <div className="sub-container">

                        <MultiSelect w={250} placeholder='Select Integration Method' searchable maxSelectedValues={1} data={options} value={method} onChange={setMethod} />


                        <TextInput w={250} placeholder='Expression (ex: sqrt(x^2+1)' value={expression} onChange={e => setExpression(e.currentTarget.value)} />

                        <NumberInput w={250} placeholder='Precision (n)' value={precision} onChange={setPrecision} />
                        <Button onClick={handleClick}>Submit</Button>
                    </div>

                </div>
                {showWarning && <Text style={{ marginTop: 30 }} weight={'bold'} align='center' color='red'>You forgot to enter an integration method!</Text>}

                {showSimpsonWarning && <Text style={{ marginTop: 30 }} weight={'bold'} align='center' color='red'>Remember: n must be even!</Text>}

                {solution && <Text style={{ marginTop: 30 }} c={'green'} weight={'bold'} align='center'>Solution: {solution}</Text>}
            </AppShell>

        </MantineProvider>
    );
}

function HeaderContent() {
    return (
        <div className="header-container">
            <h1 style={{ margin: 0 }}>Numerical Integration Calculator</h1>
            <p>Bryce Blankinship</p>
        </div>
    )
}
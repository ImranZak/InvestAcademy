import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Button, Divider, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';

const caseStudies = [
    {
        company: "Tesla, Inc.",
        background: "Tesla, Inc. is an American electric vehicle and clean energy company founded by Elon Musk and others in 2003. Its mission is to accelerate the world’s transition to sustainable energy. Tesla aims to create electric cars and renewable energy solutions.",
        businessModel: "Tesla designs, manufactures, and sells electric vehicles, energy storage systems, solar energy products, and software solutions. Its revenue streams primarily include car sales, energy generation products, and services like charging infrastructure and software upgrades.",
        financialPerformance: "Over the past three years, Tesla's revenue has grown from $31.5 billion in 2020 to $81.5 billion in 2022. Its profitability has also improved, with a net income of $12.6 billion in 2022. The company boasts a growing cash flow, with a P/E ratio currently around 90.",
        futureAmbitions: "Tesla plans to expand production in new gigafactories, release the Cybertruck, and push for full self-driving technology. It also aims to scale its energy generation and storage business globally.",
        publicOpinion: "Public sentiment is generally positive, with Tesla's brand being synonymous with innovation and sustainability. However, there is skepticism around its high valuation and the delayed rollout of some products, such as full self-driving cars.",
        correctAnswer: "yes",  // Based on financial growth and future prospects
        reason: "Tesla has shown significant financial growth and future potential. Its revenue and profitability have increased, and the company is expanding its production with new gigafactories and innovations in self-driving technology, positioning it for continued success."
    },
    {
        company: "Meta Platforms, Inc.",
        background: "Meta Platforms, Inc., formerly Facebook, was founded in 2004 by Mark Zuckerberg. Initially a social media platform, Meta's mission now is to build community and bring the metaverse to life, focusing on immersive digital experiences.",
        businessModel: "Meta generates revenue primarily through online advertising on its social media platforms: Facebook, Instagram, and WhatsApp. The company is heavily investing in metaverse development, with its Reality Labs division focused on AR and VR products.",
        financialPerformance: "Meta's revenue in 2022 was $116.6 billion, down from $117.9 billion in 2021 due to challenges in ad targeting and increased competition. Despite this, Meta remains profitable, with a net income of $23.2 billion in 2022, although it was lower than previous years.",
        futureAmbitions: "Meta is pivoting toward the metaverse, aiming to lead in virtual and augmented reality markets. The company also plans to improve its advertising services and expand into new digital experiences.",
        publicOpinion: "Meta faces mixed public sentiment. While it remains a dominant force in social media, concerns over privacy and the massive investments in the metaverse, which have yet to pay off, have sparked criticism.",
        correctAnswer: "no",  // Based on financial struggles and uncertain metaverse outcomes
        reason: "Meta has faced financial challenges, with revenue stagnation and declining net income in recent years. Moreover, its heavy investments in the metaverse are uncertain and have yet to deliver tangible returns, making its future more uncertain."
    },
    {
        company: "Apple Inc.",
        background: "Apple Inc., founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in 1976, is a technology company known for its innovation in personal computing and mobile devices. Its mission is to bring the best user experience through its innovative hardware, software, and services.",
        businessModel: "Apple generates revenue through the sale of its products, including iPhones, iPads, Macs, wearables, and accessories. It also earns from services such as the App Store, iCloud, Apple Music, and Apple Pay, with services becoming a key growth driver.",
        financialPerformance: "Apple has shown consistent growth, with a revenue of $365.8 billion in 2021 and $394.3 billion in 2022. Its net income in 2022 was $99.8 billion, with healthy margins and a return on equity of over 100%.",
        futureAmbitions: "Apple plans to continue expanding its services business while innovating in hardware. Rumors suggest upcoming products such as augmented reality glasses and Apple’s own electric vehicle, positioning the company for long-term growth.",
        publicOpinion: "Apple enjoys strong customer loyalty and positive public sentiment, with high satisfaction for its products and services. It is seen as a premium brand with innovative design and seamless user experiences.",
        correctAnswer: "yes",  // Based on financial strength and continued innovation
        reason: "Apple has demonstrated strong financial performance and consistent growth, with revenue and net income increasing year over year. The company's focus on services and potential new product categories like AR glasses and electric vehicles indicate a commitment to innovation and future growth."
    },
    {
        company: "Amazon.com, Inc.",
        background: "Amazon.com, Inc. was founded by Jeff Bezos in 1994 as an online bookstore and has since grown into the world’s largest e-commerce platform. Its mission is to be Earth’s most customer-centric company, offering everything from retail to cloud computing services.",
        businessModel: "Amazon's revenue streams include e-commerce sales, Amazon Web Services (AWS), Prime memberships, advertising, and physical stores. AWS has become one of the company’s most profitable divisions.",
        financialPerformance: "Amazon’s revenue has grown significantly, reaching $469.8 billion in 2021. However, the company faced a slowdown in 2022, with profits dropping to $11.2 billion. AWS continues to be a key growth driver, with margins much higher than the e-commerce segment.",
        futureAmbitions: "Amazon aims to continue expanding AWS, logistics, and international e-commerce. Its future plans include advancements in AI, delivery drones, and further expansion into health care through Amazon Pharmacy.",
        publicOpinion: "While Amazon is known for its convenience and innovation, the company faces criticism regarding its treatment of workers and antitrust concerns. However, customer satisfaction remains high due to its fast delivery and vast product offerings.",
        correctAnswer: "yes",  // Based on diversification and strong growth in AWS
        reason: "Despite some recent profit slowdowns, Amazon remains diversified with strong growth in its AWS cloud division. Its future ambitions in AI, healthcare, and logistics are positioning it well for sustained long-term growth."
    },
    {
        company: "Netflix, Inc.",
        background: "Netflix, Inc. was founded in 1997 by Reed Hastings and Marc Randolph as a DVD rental service. It has since transformed into a leading global streaming platform, providing entertainment content on demand.",
        businessModel: "Netflix operates on a subscription-based model, offering streaming services to millions of users worldwide. The company invests heavily in original content, producing movies, series, and documentaries to attract and retain subscribers.",
        financialPerformance: "Netflix's revenue has grown from $25 billion in 2020 to $31.6 billion in 2022. However, subscriber growth slowed in 2022, leading to a stock drop. Despite this, Netflix remains profitable, with net earnings of $5.1 billion in 2022.",
        futureAmbitions: "Netflix plans to continue investing in original content and expand into gaming and interactive experiences. The company is also looking into creating cheaper ad-supported tiers to attract new subscribers in saturated markets.",
        publicOpinion: "While Netflix is praised for its original content, it faces growing competition from Disney+, Amazon Prime, and other streaming platforms. Some users also criticize recent price increases.",
        correctAnswer: "no",  // Based on slowing subscriber growth and high competition
        reason: "Netflix is facing challenges with slowing subscriber growth and increased competition in the streaming market. These factors, combined with rising costs and a competitive landscape, create uncertainty about its future growth potential."
    },
    {
        company: "Shopify Inc.",
        background: "Shopify Inc., founded in 2006 by Tobias Lütke, Daniel Weinand, and Scott Lake, is a Canadian e-commerce company that provides a platform for businesses to create and manage online stores. Shopify aims to simplify the process of setting up and running an online retail business.",
        businessModel: "Shopify operates on a subscription-based model, offering various plans for businesses to set up online stores. It also generates revenue through transaction fees, payment processing, and additional services like marketing tools and shipping solutions.",
        financialPerformance: "Shopify's revenue grew from $2.93 billion in 2020 to $5.60 billion in 2022. Despite a slowdown in growth rate, the company remains profitable with a focus on expanding its merchant base and enhancing its platform's capabilities.",
        futureAmbitions: "Shopify plans to continue enhancing its platform with new features and integrations. It aims to expand its services to more regions and improve its offerings for enterprise-level clients.",
        publicOpinion: "Shopify is highly regarded for its user-friendly interface and robust e-commerce tools. However, it faces competition from other e-commerce platforms and concerns about its profitability amid rapid expansion.",
        correctAnswer: "yes",  // Based on revenue growth and platform enhancement
        reason: "Shopify's substantial revenue growth and ongoing enhancements to its e-commerce platform position it well for continued success, despite facing competition and profitability concerns."
    },
    {
        company: "Zoom Video Communications, Inc.",
        background: "Zoom Video Communications, Inc., founded in 2011 by Eric Yuan, is an American communications technology company known for its video conferencing software. It gained widespread popularity during the COVID-19 pandemic for its ease of use in remote meetings.",
        businessModel: "Zoom operates on a freemium model, offering basic video conferencing services for free and charging for premium features and larger meetings. It generates revenue from subscription plans, add-on features, and enterprise solutions.",
        financialPerformance: "Zoom's revenue surged from $622 million in 2020 to $4.1 billion in 2022 due to increased demand for remote communication tools. The company remains profitable, although growth has moderated as the pandemic's impact lessens.",
        futureAmbitions: "Zoom plans to diversify its offerings by expanding into areas like unified communications and hardware solutions. The company is also focused on enhancing its platform with new features and integrations.",
        publicOpinion: "Zoom is praised for its reliable video conferencing technology and user-friendly interface. However, it faces competition from other communication tools and scrutiny over privacy and security issues.",
        correctAnswer: "yes",  // Based on revenue growth and diversification plans
        reason: "Zoom's significant revenue increase and strategic expansion into new communication areas suggest a positive outlook, despite facing competition and privacy concerns."
    },
    {
        company: "Slack Technologies, Inc.",
        background: "Slack Technologies, Inc., founded in 2013 by Stewart Butterfield and others, is an American company that provides a messaging platform for teams. It is designed to facilitate communication and collaboration within organizations.",
        businessModel: "Slack operates on a freemium model, offering basic messaging services for free and charging for premium features like advanced security, compliance, and integrations. Revenue comes from subscription plans and enterprise solutions.",
        financialPerformance: "Slack's revenue grew from $630 million in 2020 to $1.6 billion in 2022. The company was acquired by Salesforce in 2021, and its performance has been integrated into Salesforce’s broader financial results.",
        futureAmbitions: "Slack aims to enhance its platform with new collaboration features and deeper integrations with other enterprise tools. The company is focused on expanding its user base and improving its market position within Salesforce’s ecosystem.",
        publicOpinion: "Slack is well-regarded for its intuitive user interface and robust collaboration features. However, it faces competition from other workplace communication tools and challenges integrating fully with Salesforce’s broader services.",
        correctAnswer: "yes",  // Based on revenue growth and platform enhancement
        reason: "Slack's revenue growth and its integration with Salesforce provide a strong foundation for future success, despite facing competition and integration challenges."
    },
    {
        company: "Dropbox, Inc.",
        background: "Dropbox, Inc., founded in 2007 by Drew Houston and Arash Ferdowsi, is an American cloud storage company. It offers file storage, synchronization, and collaboration tools, aiming to simplify data access and sharing for individuals and businesses.",
        businessModel: "Dropbox operates on a freemium model, offering basic cloud storage services for free and charging for additional storage and advanced features. Revenue comes from subscription plans for both individual and business users.",
        financialPerformance: "Dropbox's revenue grew from $1.9 billion in 2020 to $2.3 billion in 2022. The company remains profitable with a focus on expanding its product offerings and improving user experience.",
        futureAmbitions: "Dropbox plans to enhance its platform with more collaboration and productivity tools. It aims to drive growth through enterprise solutions and deeper integrations with other business applications.",
        publicOpinion: "Dropbox is valued for its reliable cloud storage and ease of use. However, it faces competition from other cloud storage providers and criticism over the pace of innovation in its product offerings.",
        correctAnswer: "yes",  // Based on revenue growth and product expansion
        reason: "Dropbox's revenue growth and ongoing expansion of its product offerings position it well for future success, despite facing competition and innovation challenges."
    },
    {
        company: "Square, Inc. (now Block, Inc.)",
        background: "Square, Inc., now known as Block, Inc., was founded in 2009 by Jack Dorsey and Jim McKelvey. It provides payment and financial services, including point-of-sale systems and financial software for small businesses.",
        businessModel: "Block generates revenue through transaction fees from its payment processing services, hardware sales, and subscription-based software solutions. It also explores opportunities in cryptocurrency and financial services through its Cash App.",
        financialPerformance: "Block's revenue grew from $9.5 billion in 2020 to $18.3 billion in 2022. The company remains profitable with strong growth in its payment processing and financial services segments.",
        futureAmbitions: "Block aims to expand its financial services and cryptocurrency offerings. The company plans to enhance its payment solutions and explore new opportunities in blockchain technology and decentralized finance.",
        publicOpinion: "Block is recognized for its innovative payment solutions and commitment to financial inclusion. However, it faces challenges related to market competition and the volatility of cryptocurrency investments.",
        correctAnswer: "yes",  // Based on revenue growth and innovation in financial services
        reason: "Block’s substantial revenue growth and expansion into new financial services and cryptocurrency sectors provide a strong foundation for future success, despite facing competition and market volatility."
    }
];

function CaseStudies() {
    const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * caseStudies.length);
        setSelectedCaseStudy(caseStudies[randomIndex]);
    }, []);

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = () => {
        if (!userAnswer) {
            setResult('Please select an answer.');
            setDialogOpen(true);
            return;
        }

        setIsSubmitting(true);

        if (userAnswer === selectedCaseStudy.correctAnswer) {
            setResult(`That's a good choice! Enjoy learning more on our platform!`);
        } else {
            const wrongreason = `${selectedCaseStudy.reason}`
            const formattedReason = "That's not the most appropriate choice. \nReason: " + wrongreason;
            setResult(formattedReason);
        }
        setDialogOpen(true);
        setIsSubmitting(false);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setIsSubmitting(false);
    };

    const handleRetake = () => {
        setDialogOpen(false);
        setUserAnswer('');
        setResult('');
        const randomIndex = Math.floor(Math.random() * caseStudies.length);
        setSelectedCaseStudy(caseStudies[randomIndex]);
    };

    if (!selectedCaseStudy) return <CircularProgress />;

    return (
        <Card sx={{ maxWidth: 800, margin: '20px auto', padding: '20px', boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>{selectedCaseStudy.company} - Investment Case Study</Typography>
                <Divider />

                <Typography variant="h6" mt={2}>1. Company Background</Typography>
                <Typography variant="body1">{selectedCaseStudy.background}</Typography>

                <Typography variant="h6" mt={2}>2. Business Model</Typography>
                <Typography variant="body1">{selectedCaseStudy.businessModel}</Typography>

                <Typography variant="h6" mt={2}>3. Financial Performance</Typography>
                <Typography variant="body1">{selectedCaseStudy.financialPerformance}</Typography>

                <Typography variant="h6" mt={2}>4. Future Ambitions</Typography>
                <Typography variant="body1">{selectedCaseStudy.futureAmbitions}</Typography>

                <Typography variant="h6" mt={2}>5. Public Opinion</Typography>
                <Typography variant="body1">{selectedCaseStudy.publicOpinion}</Typography>

                <Typography variant="h6" mt={2}>Research More Online</Typography>
                <Typography variant="body1">These are just the general idea of the company please go online to find out more before choosing an answer!</Typography>

                <Typography variant="h6" mt={3}>Should you invest in this company?</Typography>
                <RadioGroup value={userAnswer} onChange={handleAnswerChange} row>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>

                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Result</DialogTitle>
                    <DialogContent>
                        <Typography>{result}</Typography>
                    </DialogContent>
                    <DialogActions>

                        {!userAnswer ? (
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDialogClose}
                            sx={{ mt: 2 }}
                        >
                            Close
                        </Button>
                        ) : (
                            <><Button onClick={handleDialogClose} variant="contained" color="primary" component={Link} to="/dashboard">Main Menu</Button><Button onClick={handleRetake} variant="contained" color="primary">Retake Test</Button></>
                        )}

                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

export default CaseStudies;
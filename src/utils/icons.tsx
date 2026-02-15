import { PlayIcon } from "lucide-react";

const iconConfig = {
    DebuggerIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" color="#50a2ff" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-activity w-6 h-6 text-blue-400" data-fg-d3bl6="0.8:1.6009:/src/app/App.tsx:126:15:3681:46:e:Activity::::::Y0P"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
    ),
    polygonPlayerIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" color="currentColor" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play w-16 h-16 mx-auto mb-2 opacity-20" data-fg-dn8n8="1.13:1.5964:/src/app/components/VideoPlayer.tsx:115:15:3435:54:e:Play::::::IIc"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
    ),
    infoIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" data-fg-b2u92="1.19:1.3539:/src/app/components/LogPanel.tsx:35:16:1027:63:e:Info::::::DcjU"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
    ),
    playIcon: (
        <PlayIcon width={16} height={16}/>
    ),
    resolutionIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" color="currentColor" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-signal w-4 h-4" data-fg-cawk17="1.16:1.3749:/src/app/components/StatsPanel.tsx:46:11:1812:30:e:Signal::::::BblG"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>
    ),
    bitRateIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="currentColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-zap w-4 h-4" data-fg-cawk25="1.16:1.3749:/src/app/components/StatsPanel.tsx:55:11:2137:27:e:Zap::::::Cp7"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
    ),
    bandWidthIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" color="#50a2ff" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-activity w-6 h-6 text-blue-400" data-fg-d3bl6="0.8:1.6009:/src/app/App.tsx:126:15:3681:46:e:Activity::::::Y0P"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
    ),
    bufferLengthIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" color="currentColor" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock w-4 h-4" data-fg-cawk47="1.16:1.3749:/src/app/components/StatsPanel.tsx:79:11:3055:29:e:Clock::::::EGEm"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>    
    ),
    droppedFramesIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="currentColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-triangle-alert w-4 h-4" data-fg-cawk58="1.16:1.3749:/src/app/components/StatsPanel.tsx:91:11:3520:37:e:AlertTriangle::::::Ruk"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
    ),
    qualityIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="currentColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-gauge w-4 h-4" data-fg-bn5g4="1.22:1.3345:/src/app/components/PlaybackControls.tsx:31:11:900:29:e:Gauge::::::Bcv3"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
    ),
    logIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="currentColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-terminal w-5 h-5 text-blue-400" data-fg-b2u97="1.19:1.3539:/src/app/components/LogPanel.tsx:61:11:1825:46:e:Terminal::::::DcQ8"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
    )
}
export default iconConfig;
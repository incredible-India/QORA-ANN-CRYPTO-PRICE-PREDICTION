def BitcoinIndianRupee(bprice):
    indianRs = 81.5
    btco = bprice[0]
    btch = bprice[1]
    btcl = bprice[2]

    if(btco > btch):
        btch = btco
    if(btcl > btch):
        btcl = btch-1000
    
    return [btco*indianRs*2*indianRs,btch*indianRs*2*indianRs,btcl*indianRs*2*indianRs]


def EtheriumIndianRupee(eprice):
    indianRs = 81.5
    etco = eprice[0]
    etch = eprice[1]
    etcl = eprice[2]

    if(etco > etch):
        etch = etco
    if(etcl > etch):
        etcl = etch-100
    
    return [etco*indianRs*2*indianRs,etch*indianRs*2*indianRs,etcl*indianRs*2*indianRs]


def BinanceIndianRupee(bnbprice):
    indianRs = 81.5
    bnbtco = bnbprice[0]
    bnbtch = bnbprice[1]
    bnbtcl = bnbprice[2]

    if(bnbtco > bnbtch):
        bnbtch = bnbtco
    if(bnbtcl > bnbtch):
        bnbtcl = bnbtch-100
    
    return [bnbtco*indianRs*2*indianRs,bnbtch*indianRs*2*indianRs,bnbtcl*indianRs*2*indianRs]
import { useCallback, useEffect, useRef, useState } from "react";
import { NextIcon, ActorIcon as Header } from "@/components/ui/icons";

import { useSearchQuery } from "@/domain/search/search.queries";
// import ReactPlayer from 'react-player'
import { useViewModeStore } from "./use-view-mode-store";

const firstLesson = {
  title: "Characters #1-3: 一 yī, 二 èr, 三 sān",
  lessons: [
    {
      id: "1",
      type: "prop:create",
      componentId: "一",
      title: `Pick a Prop for 一`,
      gifSearchTerm: "harry potter wand",
      gifSearchTerm2: "brushing teeth",
      gifSearchTerm3: "broom stick kid cartoon",
      ideas: [
        {
          title: "Harry Potter's Wand",
          url: "https://i0.wp.com/www.iconvsicon.com/wp-content/uploads/2022/10/Wands-Hero-Blue.jpg?fit=1000%2C667&ssl=1",
        },
        {
          title: "Basuri Flute",
          url: "https://abedabun.com/wp-content/uploads/2020/11/crop.jpg",
        },
      ],
    },
    {
      id: "2",
      type: "prop:create",
      componentId: "二",
      gifSearchTerm: "skiing in the mountain",
      gifSearchTerm2: "chopsticks",
      gifSearchTerm3: "drum sticks",
      title: `Pick a Prop for 二`,
      ideas: [
        {
          title: "A Pair of Skis",
          url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUUFBcVFRQXGBcaGhsaGhobGhwaGxgaGhcaGxcbGhobICwkGx0pIBcaJTYmKS4wMzMzGyI5PjkyPSwyMzABCwsLEA4QHhISHjIpJCk0MjIzMjQyNDM0MjIyPDIyMjIyOzIyMjIyMjIyMjsyMjQyMjQyMjIyMjIyMjIyMjIyMv/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABGEAACAQIEAwUECAQFAgQHAAABAhEAAwQSITEFQVETImFxkQaBobEUIzJCUsHR8GJykuEVQ4Ky8VOiY8LD0gclMzRzk6P/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QAMBEAAgIBAwMCBQIGAwAAAAAAAAECEQMSITEEE0FRgSJhcZGhBTIUI2Kx8PEzweH/2gAMAwEAAhEDEQA/ANm2HkQRIqlewOXXLmHofWriXGG0+VTLiuoiuipyjwZXGL5IcBgkbe2Qf5xB+M/CtBgsKqDugj3n40JTEAHSKMYa6CN58qyZ5yb34HY4xXBYCdPlFQYho/cCro2qniEBPMfEelIGlZ1J8vE+kVCz5RUzkDr7jVS5fEEZqOKbBk6K+JKsCQSOpHL9KxvEcLkeNOunjWpa9Om3uEEdNtKE45I1NtWHIy3oYNdXpG8bow9QlNGfZKiZKMq9n71pvc5+Gldazhm2a4nmAw/Kuj3q5TMLxXw0AWt1A9utCeFI32b9s+YK/rSuez9z7rW28iR8xRrqYrl/9C308n4MwyUwrR+7wC//ANOfJkM+WtUH4VeH+Tc/ob9KfHNB8SX3M8sM4+GDCtNIq/e4fdUS1p1HUowHqRVXLTFNPhg01yiArTStWOzpdmeVXZFIrFaaVqyyUyKuy1IgK00rU7LTStEGpEBWuEVMVrkVAtRDFcipStcK1YWojilFPy1zLUJYyKUU+KWWoXZHSinxSy1KJYyKVPy0quiWe6raDdKa2C8qq4bGjmKLYe8rbEV4vIpwO7FxkUPoY6GprKFCMp0nUUVOEB51wYJeZJ8OXwpLySlyMUUuCyu1CuJBiYVh5bUVVYECqV2wZPOguggBizdHIn4/KhT4lugrXMvWqeJwKONRrWvDnitpITkxt8MA2sWNiKsC2G1G/wAD5imYnhpXbblVa27Ia2rTJXFma3HaRzE8MzaqIPTlQe7aKkgiCK1KYkGocdghcUsv2wP6h4+NHj6iUXUuAMmJSVxMwFq0uFLajlTDbMxRThyTIjl8q1ZJUrRnhG3RRBuLtcIj+ImozxO4v+YD/pFXsVhYmhTWSTGWaqGiW7SCnqjsh+H4rcmAF8+8I9DtRFMcr6N3tYiBlP8AUDUNjhunjV+1htADrHT4elLyPHewcFPyUsSlsiGwyGDpAC6eBSCar/QcMdrTp5MdP6pq9isOzDujbf8At0qHDW4BliDUjKls39ySgm90vsD7+Cwo0JcNGxE8p5EfLnQvEYK3Eq0DxkR5zp8aIY5WZtSG8f70M4oScq7aTt4kD5GnSyyxQ1W2KjijklppIoKJJCnNGhjWOkxtXCtAbl7JjBB0bKD4yMonyIFaNHIBHI71o6TqXmi3VNGbqun7Mkr2ZXK1xLZJAG5IA5anxO1XVvCMrW1ImZGhHhPTwpWLSFxqY5yJjkNt9SOVaJ5NEXJrgXjjqkop8gC/cuO7JbEgaK4+zpOYyR3p5eXOrdpHXuvJIAMwBMztB12rVrgkVAuUDyG1C+KqAyqOQJPjMCT/AE1z+nzynkSbOhnhGON0uAVlpZaly1zLXWObqIormWpstcy1Zeoiy0stS5aWWoTUQ5aVTZa7Vk1HqSCruGuBTOUGoFqRa8tNKSpnajszS4bEq40OvMVPWdw9wqQQYozhMTn3if3yrn5IaWa4yss12K5UOJdgJFLCO3rQNUntxUT4+DqahbiQNWscnwitSXk5iVPShd+xIon9LBpZp5zT8cpQ8CppSM8QVqxgrzBtP35USv2ARJX31Us2I1Fa+5GcXYnQ4sg4phQfrEGo1YdetT8PtDKXGxOnkdatOk++psBgAqsmuU6/8UuWb4NLf+g44vitAu8skwCfKBFdsWnO+Qr1gFvWiAwSyf38eVSi0APAVHmVUidt3bKb4bLyJ8jtXckAQJ6c/jUWN4qiaDvN7ooBjeKXH0zQPDT403HhyZOdhU8sYBfE4tLY7xA8Jk/CgOM4oraIpnqY+WtVHk76+dRlK6OLpow3e7MeXO5cbEFy67bsfWuDBBwpJO0afzMfzqbsqlTSB5/l+tTq0njpepXS2p38jIcd4UqE3O9mGoPLRpG1Fhbq9xfD57bD+Ex5xUeESbaE75FnzyianQNRTSL61OdNlQ26IcIwXaG5rBVJH9Qmmm1VzCzbt3GBIYvbUHw77MNdIOVaf1mT+S6+Rn6XH/NXuPuIV5iCfeKFcVILiN8ony1gfP1ot2bTqQfHr+lDcbhxnJHMD4aVj6P/AJE/qbOrb7bSBuWllqybVcNquzaOPuVstLJVjs6WWrslsrZaWWp8lLJV2TUQZa5VjJSqWTUeoiyfPyIPyrpQjcRV/wCkt+FD5rXBio3t2/SK8h3ZPwem0oprU1rEFTINWPpac7I9x/tXPpNjnbPr/ehbb5iWtvJZwvEGbQrJ8KZj8ZBAe3p/N+m1cw+Nsqe6rA+v51zE4mxc+0zAjnB+WopWn4uHQerbkF3bls/dceTT8xVO4ByJ99GDZsn/ADT71/sKQwNvleT3iPzrTHJGPqKlFyARnrU2ExRRtaLXOFhvv2yfBoNQPwS5yykedM72OSqQGiUXaJPpCXNJp6Yeefwp2E4KF1ff1qbE4jsxFu2zHqQY/vWSTV6YMek6uQ63hqc1xVBltt4oHfxt0nvg+UFap37rNvMdOVMj0rk/iYEs9cIIYnizbW7Y82ZR8JoRiMRef7VxfIOgHoDXVVOYNNfDpyb3HQ+tb8eOGPhfizLOUp+SqcMebJ/UD8qYcN/Evqf0q61u3/H8DXOxQ/eYea/oa0LJ/lCXAo9gvNvQE/OKYbS9W/pH/uoj9GX8Y9CK6OHz9l0Pvj5ii7qXL/z7A6H6Aw21/i9B+tQ3xBWAefPwH6URuWCpIO/rVTHrlUHow+II/OhzNSgw8aqSK2J+zUHDyTbQwAY5abVLeOlO4Qc9oGPvOP6bjKflS+ldNh9QrSOsD1NThYstP/UX4K361IbdTXbX1E/+J8kH607qpLRXzQvBH47+pQR5H71qveWTNPUmPHX/AJNS2rcqD1pXSbTb+Qzqd418ymbVc7Kr5tU02q6Os5+goG1S7Kr/AGVLsqvuE7YPNmudjRDsqXZVfcK7aB/Y12iHZ0qncJ2jdOhB2ZfMU03G6g1GPaywZALMB/AY12iaIYTE2by50gjYxuCNwQdj4V5KU5RVyiehUE+GUCeq+lIpOx91FDg7Z/4/vUtvB2/w+/vD5mos8SdpgIgj9xUi4cv94z460cGDtgjX3TVgsq8vQfpUln9Cli9TO/4c0Vz6C27GB12NGL+MH4oH8p+YNNTEWz98UPfmF24g9LtpdIZz8PjTn4g4+yqqPU+tPuoo1Ug+X96bbQvsgI5mR+tEpRe7X3KalwVmx7/iNRNiW/Ew8mPyqzicMoOh+NVuzH/BFPhKDVpCpqS2bIvpd38betL6dd/GfQfpVj6IDzqN8LHMU1TxvwhbjNeWR/4hc6j0FNOOfon9Ip7WBHjTFw7HYUaePnYH4vUaMST/AJds/wCip1tsd8Ov+2mIpU8/can+kXOQPv1qpf0pfcuP9Q76AhHetgeRNDOJ4jCYdQbtwWwdBmcSf1q3cFxtz8QPzrIf/EKxmwjLozfbEHYICzsfCJH+oUNyim9XsFUXJKgtxnFWrNq5d7xyIWgkakDQe8wPfWYucUa/w44iAr5lJVRICreCsJP8IJ99O4KGxeCwy3IK54efvpazFNurKgPWCaqez4z4PGYYatbDhfEFWKT/AKlNH3G2lezX5Isezl5TX2CSvKir/AMORaj+NyPJmLfnQjhjzbXyHxFabgYm23g5/wBq0zHLS7AyK4jzaqLHvltKm2a4T6KtE+zoR7QNlFsdS3/los09SS+YGKNOwSzTt+xzovYtdxfIfKhCaa+FakWI06VeKWlsmVXQPNqm9lRE2q52VaO6I0A7sqXZUQ7KudlU7pNAP7Kl2VEOxpdjV90nbB/ZUqIdjSq+6TQZFbfaIBachVKk5BPMGG6TtBHOrlnE3EYNbuFG5xsw8RUWI9nDcti5h7lu6hMEZgjEg95SJI38c0iCKGq9zDMUNs21I0QoNxPeGcEEQdAOp30rH3ITTWzRo0yi73R6Rw72itsg7Qm22gLEEIT5/d9/qaMfSlInOCORzaeu1eQ4bibwTljUrKto2Qb9Mp8eelS4fiNsrKuqA96Bv4xEsRsNJrC/0+E3cXRq/inFbqz103vL4VVucTtIQDcA1jRpgnaYkD315LjuLG6wQtcA2Xv5Ruco5sB3d99dRzphx9wXBHdGuVVmFHkxMzOs6z8JH9Mbe7/BUuuSWyPZ1xEic0g7bQfSkzA7qpry/h/tU1sQc2nJdVPXutGX3EUUT2oZ9RctqJ6FT5anzpUv0zNF7PYKPW4pI2rWLf4Y8if1qSwAkwSZEa1jbfGb+sOG5zlBA945U7/HrqGGZD10JCk7SV5+Anxqn0Wbi19wl1GLmmae9YkzLH9+dRhI+6f37qAWPaW59p1QqJBiVMgaEEzM9PlVdvbB80i2MvQhgxGuxnT0q44OoT01fuVLLh5uvY1SXY5H4D8qmF5I1Ue/U0Cw3tVZaJLJ5gEeoNEv8Rtf9RNADqQNG+ydeRikzjOL3i0Mi4NbSTLf0ldgI90Ux1DbmoUxFpwCrIQdiCDPpUoA6UOpx8NF6dXlEbWRyPxpgsEfrNPu3FH2iB++lcRlOzA+Rp0c0qtipY1Y3LHP5UB9pMPbZWV3C57V62GOgDOEAEnSTBjyNaCF6j1puUHYz5Gj7lr/AMB00eeez/D7tzh9q5YdUuK6umaSp7O2LLo8fdbI23gd9as+xWAk43OoW6bro+Ull1BYZdBp9ZHjE0S9icqW79k6dliryAfwlgynyh6fwB0TF42WXI72nUgzmDWhmIjxU+lXB8OiSb3XgynCrbIio32lAU77jQ7679a2HstqlwdGB9Z/SgWNT627A+9PqA0++Z99F/Y5x2l1SdSqED+UuD/vWtTlUbFtW6NF2VZv2lf6xF/CCfWP0rUYi6qDUiehIHvM7Csjx26HvArGqg6GRsOflQxm5NFKNWU8Okso/EQNfEgVszbrH4VgLlvMJAdD6MCPlR8cfGrG2cgMFgw0HiCP7Ux6r+FASryXzbpdnTLfFrT/AGGzaA6QBryJYgD36U3E8RW2BmBkzCghpjQaqYFDrndVuTSqsl7OudnVRON25hlZeh39Y2+NE1uJ2faz3IJmCCQPA1Usko8okYKXBX7Kl2VU8Nxu20BwVJ94On70q1ieJWrbBXaGKhojVVOxYcqtzknVFqKasd2dKufT7P8A1bf9a/rSqa5ejK0ozXEL1oKwOHDZz3hblTnYAZu42hgDWazPFOJ3Ld23c7S6VZiLiNLK2VwzKysSoJkiNwFA2rV3uD3yf/sx55sNr6W9D7yKB8a9nsU5j6JK5Yk9gHUk6lHQjLHSBPWgydvQ91f1GQc9XDr6GgxPs/avIWsEJmh1Nsie8NCbb+HIOohjpWYxfCLthiCBkM5SVIgjXKxO4Kka8iDBrX+zN+6tns8VbsCIyRcQCFEQbechDoIy6eAq5xHjdpBluWy4Yf5f1inqCokc+e8eFZsWbJGXr7jsmOLXoecNbKJLIoAmSuqgRoWkCOXlUDsCBzjYz0OnyrW4JsHjGKJYu2rgXOFtm2FygxnX6wqyiRMDQ7jWquL9i7iNFnMyQSARlIPIc5nqYrqYetjeme31MGXpJVqiZovO+9NUwaL3PZjGKpZrDbA6FWPlCkmdfhVC7w68v27TgdSpHxrdHLjnw0/cxyxTjymdwlw97I4SBOVjAeNxrpm/vtVvEcae5lDovdkCCRvudZ50OuYS4oLNbYKNSSpAAOkk9Kj205dDrFU4wbvkK5JVwG7eKttbbMbmaCoym2uSYIOUsC4mdR0oaMTBylpbYCIJjw5aRvVZv309f1q2cZcIQuO0BMJ2i5pPRGbWdPunlQ6NLtfkmvUqf4F9JYHRZ8o6Tr76M4Fe3712QsAlAVRmcgxJdhOxE7xoKH/Zyp2D2nf7OWddwIR9TJB3J6ChnGbaooZ7pL5wMgGZ9Rmk94JGmwJg0rLkik3dP70OxY3aXg3SYBLdosblu1mkk55B0OVc25BAJhekTWYxHFGNwi3dcqFgEEoIXeFB0U7xqeutBMFhr98M9pxcYEBlLqjgeKvHqpI8dK4+Hv25Fy26A/ZZl7s+BPdJ6+XhWfFOEblJ2OywlJaYqjQW+PXVy5nzKDtpJ6gtHzmr54xmOft7aKyFgoUsUEAfhzZ9f5ZMTMVhTi0AKDVgQZ+6eoMenj1qD6TDEzJO55AzpFHLJjmk40BHFOOzs1uIxpfuAu1tTKl9WJ2k6nLsdJpJdJiWJy9WMCTCzO1ZG7j3LAhojQRp5SKhGJYHRjvPmep8aJ54RVJArBJu2zaYfi72bl4W+zJfIwcjMdsgK5gPwjcTVPB8TuW7rsCMxVJD94Nq85vHU6zQpcQSQ2veWNp1kH0ksffTsTi8joTBlSPMaHbp3j60EdCV/Pf3Hy1X9Y7e3+jWe0GOKWrd/uguqabgH7BGnlTMJxBUVbmYd9QQdwdAQDHP9KDhe2w6dkqECe0Rt3K3C1tjGogALMmRpGgNUMarph2DKFACBBJmJOgn7UQ3uYdNc6lUn6DHG4r1NVc44HIbKmg5SCeX2tflU3FsaotW7mi9wsfIOwPLoteb2saymZJ8jB9dZ94NbXiSM+DwzoFINqGQjcHMYJ5HNJ8oosmSMklFbg48cotuT2JeH4/tLS3DH2jOXYQSAdfdU2I4wLYAUZ1cSYIggnykbTr/AM5+x2iWnBtrbQBYABHeYyYJPeH51AcU2Xcbjp1n8hTsX7VYvNzsHBxq0NTbYz/FsfL+9El46r2+4ttVnYLlIaNpknWPH41h7zyT1Oum2utJMQyyOR3Hy94p70vkSlJLY3nDfaG3buBmth9NCdYO8gGNdhrEfCu8V9pu1fMoKjLkKkgaTPfU7GY/I1iT+JWg5Rp1Md7wjf1pr4hmAAE8tBr5ULxQ1amtwlOWmkzc4LjFq3lNy3bMDTMX32EQWEc9qfiMXbvMzHu5jmgFgBzENWEbD3MmZlYKObAga8tfy8a4uIdZAc9DlOb4jzNU4R1alz9S05VT4Np3Pxr7ytKsdbIIH1TnxDb/APZSqt/Uv2Pd24jbAk3NPJR86oYjj2FUw9xBPXJ8xWPbiXCGOuFcTzgj/a9PNng7jR2T/W4+DKa5i6WMf3KX2Nrzt/ta+4ZxXtBgDKu3gcqzz5MoPwqmMVwtwV7V1BBBHaXU38ZEUGvcK4cQCmNZQdp7/wAAq0NucEtkkW8S9zxXD3MvmWmANtfEU2MelSrW0LbzN3pTNvhsRw9US2ly0AgASN10iQwYEMRzmTrvRP6ZnjJftRym3m5f/kryrF8GuoucKGX8WZVHvdjk/wC6liOBYsW7b27IbPmGksViIOndjU66jTeqn0+CrU2/a/7lxy5eHH8nqN/BW7oC3Bh7pgy3ZkGeRADGPWhy+z622JtLhlfnPbSJ217TT0rI8N9mMcU+tuLakz3nIIWJJKrrM8oHnWk4V7K4ZV+sxBcmSRnCproSVPM8w00CcYL4Zv6UG1KT3ivrYNHB7WLu3M93DXLigqezvOxVdQVKEgHWdSTUuH9hQBlRr4bNmL3BbyERGXQk8gZA5R0jTcMweBtP9Rati5G6JmYAfxAGB4AgUbZGPhWeXUTUrW34GrDFqnuYmz7M4XDgm/dN15HIKoPMBADv4yekUC4j7SMrkLYAj7PaXLlwFeXczBPdl0r0r/DrfMCquI4Rhn0a0j+aj5xNNxdWk7yW/cXk6faoUvY8oxHHbjSxieiIqzOkd0D41Fc4DjsWEIwxQAnvP9XyEEhu8QJI0HKvWsDwezZM2rSITzAlv6jrHhVxyFGxJ8KvqOt1rTBUisXTaXqk7Z5Jh/YvFYUi62Js2o3l3EroSJCydum9WcTgL+MQFsTbdlJKrZtzmO2ZmJt6gHnPPrXpZshzLoD5ipWw5Ihe4P4AFPrvWeOVadMt/wCw14/itHieN9isXbJCozg7QpXx56D3mPGrXCOAOCbd/AXHeGZXzMogDZspymD46jx39gtYRU1CgE7kmSfM7mlecZYAZvAaT4GeVXHMoytL8keNtU2ePjgFq5dW2lq8CTEC4pUEbmTbOgAJ+0fOoeJeyL2ycpuEDmbZK+RddB6f29hCuYIUL48+fnUdiwZJdVMCJCmSdZ05e4n3RT/4qL8fkX2Zev4PDeyuIFB0h17w1EGQQD5t4VBiXDOWOwkL5Q0fKa9h9quE2Th3utaUNbyvOXKxW26uwMGSCqka9aH8W9jcIlywRahLl4K65nAymzdywAZHeCVH1MWqp82RYXy38jJeyVw9gYgkXHAmdZRDBPIaNSx3A7rJdIU3Lt11yKNWEPMAnwkeQ8K2nG+E2bFpewshFVpcqOoABY6k+ZNAODcUS9dtqpgrdtjfWO0CsR4QTTcdyg5fUGVKSR5/jMDdtf8A1Lbp/MpAPkdj7q3WBuEWbaIJhbcg/wAi5jXpOH4fbAKwCvNftRPga8+yw7ALlBdvSdPKYB+FBgkpydBZI6UA/abPbsouY5muSx6wp+G3pWetYz8Q94/StrxLhqYjKjtdXUlSiq2u3eDEHnyoXf8AYS7vauK/g4ZG/OmznKDtcCtMZrcCZwefu5+lSpa0ljA8tT5VFi+H37Z7O6pXXcwdf4W/Kas4ezcEEMrxO418p110rRDJKfCEyjGPLOkrGVVM9W1PuA0HxqyFKqFFx5PIaKNoiSJPKoWxgAMnKdiG7u/McmHl6VJhroJD5g0EGAYiNt6qWTwFHH5IkAE7zLAHfNpGvTU/uKHBiDpoeooqwI+z0zEeJihdwSSf37qkZOyNJF4cZucxbPiVEnz1pVRC+A9f70qPYqzd8O9kLt1c5uJl0+wc518dFI8QW8jR6zwXD4TK7vaUnndKs4PPsxABO0anyrTLbZk1zNO4UmF8EfuaeImm4fg9tCWFpQx3YtLH+YgS3vY1zsnWyn+57eiNUemjHhFDDX1cd23cKwfrLimyhPgNCSZ3CxpvMCo04dbIJYqjkyWtg3Lkfz3EJXSNo6g0f+g241RAeoUfnNBWwD23a4rDIJMqXLMeYKwRMk7DflSIuMnsNaaKOGsYdH7RLbux0a5cuEvoJOXPmJ5fZ6iaNWcVaZFDIYY6asZ89B+zVR+DJiit24uo+6JGbLsCQYdfnptUeGu3XJbS0M2UKcrZYInbrqAPXkCU2ped18wYpoLG2qnLbFtOo7MT13mBp51OLKP9xY8gD6j31ywgSE1zEEkwxB11ljpOvMyabexYtjvmDvCyx35ACT6Vm3b2HbFhLYXRVA8hFcJNLBYjtFDZSoOwYEN71I0qwF8Kpp+QkVwldS34VYIprVRRGbdc7MU+IppioQ4SKaWrpbyrheoQaRSA8KRemG5V0QcBXS0VEz6VGH6VdFWN4nZ7W1dtHa5bdP6lK/nWfxGL7TBYO9zL4Rj4Z7iI3+81o89ZJjl4ddDf5N1/ctnFG4n/AGqpq0imwp7ShuwfKBrzIJy8y0DUwAa80wN4WrtpCbbrnDBkSGBBBJmeYFes8Xg2bg01UhZ5tBgef6V49hld77KQ8TrKxJKme9l1KkAAk6ia2YJutImcd7PbcM+VTlWBucw1Jgbxp09DXknGOLNhriWigYnvE5o3Okaa16lbxy3MP2giDbL6fykkes15Bx+/muOBbtkaEue6x7qKoDFTtHoeVBhbi34Lmk0jT4Mm4iuAQd45jwosmMuKBtoOY/Sg3s8rtbzOMpnQAk7zvPkaIviOora/iELYg4njzctsr21aR9kifiT8qxptjdO6fwn7OnTmvy8q0mOxK66D9+VZt2kyBFbunxquKMfUS3K1ywrsQ6wxgn8XT08RNRrgbad4sfAgxv4/D30YtorrDCfmPI8qq4nhAOurRtrBop44vwmwYzfq0imcWFYqQGkzOqsBpIH3W56wTpV7B2sNdbQvA+0rBVYRzzKG08SojnFDcRhRpIYtMwTG+8fCo7mHTmWDCNoJg9Tz1rHPBO3To1RyxpXuHhwSZKtZKyYlxMAka6UqDdlf5XCRyMnX412ldvN8/sH3MXyPogk1DiC+X6vLm/i2HUkDenrThXHN5EhKp9YwJAljoB1PuFBLuGNy5n7S4kEjs0cgFdwXAEgkDrzijeJVSpVjAYFZ6SDt41STC6ZpDrOkyAORGxO42086OLrcFrwTYbu25kBFzEwCxI335nmdDM0PxGJzZoTVQsvmUZZBMkaGAeXOiuGR43UakmBynQecRrQ27hcpdftIftB4Ig6kwdwST4b77VE1ZGE8DiGdAWWGj3Hx8KsZOZMVS4a5IMEHWRB0jUfl8Ksvp1oXyEh6gDWkbtVLl2DHz5+Q3/5oRxLjqWmy5Wd+g0iRpJ/5q4xcnSKckuTRF6YXqrhHZkDEEFgDlP3ZG2tSl6pouxzNTS9RF6bmJqUQkzUw3aYzgVGbnTSrSKslLnnSLgVWLa71JNFQNjtKbTDcphuiiUSWTE1luIaW+J2pksjXFXcxcwyroP57betaZXoBcwifTncjv3MKUB8FuAPpznOnp41KKsJ2C2IwtsuDbdkVysg5TEwTzH61kXsqrk6T4e/9T61qvZm9nw2GZudq2W//AFjN+dAMaoBMDnIrX03lCsngJ3cKP8La3bMBrTAzr9szcHl3mA6aVlrvCkcgsoMGdQDrEHfblWgTE/8Ay8a65sv/APePlVFNB40zBD91+oOSXB3gti4huFvsZUVBI3RnDabjQrVfiV4LJbSieGb6sa82P/caGY+1mnefypuJJTdi5/t2MxfxBY7mKjFOviGIimg11orbY5k7vcuWdqsI81UtPpFSKapouLJMTYVxDCf3yNBcThGWYDOs6RJI/mX9jT3UcXUVGe6aCWNTXzDU3H6Gei5yUR5f3pVo8qHcD3gGlS+z82H3foeuvcuXFBtKFmdbmZSI0nINTOuhI5VzCcOIbtLrC5c5EKFC+AjU++rwpGvM6tqR2qOXVUjvctR4Ec6hvXGyNlImO6MswR4f2pmLvAKcxjkANZPIe/x0odcxIymT/CVDSQSJyiCCD5CelXGLKbLPCr7OCrkC5qzDVsusDUgRoAYOu+lXEw4aVaWg/eAJ2qLCdy2oUcumXykcoECNxFSYa8de7Mk84iABBnWfdVS5dEXA0ns323geEbDy2O1WWeedUcYxJ1K6FcoG/wDHPWprDjLtUa2LRIyDc1Weyp1yLOmpAnTb0qwxmo3aKiLILNzUqeXWdQfGNakY1TxPdIfp8RzqV8SIkCZq6BskLgVG7mo8x3NRlxzolEqx/vrpIFQPiIqu90nnFGogtlwOK471UDgCmo9EoFWWe0HSkzgCqr4gjQVXe/EEydQNtNevTpRqFg6gorkiQKGY8hcRhnP3u0t/1W+0/wDRrjr2ilWJA30MQQZB8xWY9quLuj21kSjq4YaHWUnoNHO3X3VO3ZNRqPZ+4OwQD7hdNP8Aw7jof9tC+JXVLsViCTHlyof7GY1st1nLdmHYAyMudnLEE7gkNPTXUzEkOMcOW4pZPqyBM7CB1A8+VOwxUZbg5Ha2BeGxoawyA/ZvgEdMwzj3SD6Grlg1m7WFNq4HYaEaAiAwnQqfcRRdeJ2wJ1rZjxNXXqZ55E+Q7h3AQDz+dRXbYInlVLhvE7dwZQIfox3jmOoqziboylR008+X78aXokpbh6047GX4qnemqC1ZxTGTM1Aorq41UTmZHbY5asLUK1OtEwIjS+tSAyIqK4tdQ1KLTd7j5pU+RSoQz2jNUb3DBgSYMDaTyGtdpV489AZ3B4u69y4ty2VdYZgGUiGMqF10MASc3WjapIEgAneCfnXKVOzbP2QEeB1oELEwJPoSY+FDcViMtzs8xgjMdBJnTLPIT/zSpVUOSSKtu+ocEEBdQe7qYGg25a/vc7agARoAK7Sq8nguAy7fA0FQdoTSpUKLIrzwOp+FV1ciIEjly57b1ylRoBkdzEGOQqtdvHrFKlTooFiGgkn9TXEu12lRFDWu9aj+kn9+FKlRpFMhNwzrSWWNdpUQJJmioMRhVdfrERlMmGUMJ69ZFKlUIQWrbh8jQbUyFTuKBMwq/dPqDzq1dcWMxQZ1GhtPqV7vX7JXwnb0pUqYD4B19s6hbyjLH1eTRVidgdQdT51msfhGtnX7OpB0213HXSlSrbh2ZlzpUUZ1q7bx7HRiTAgGfDT3bUqVa3FMyptEF4yZptKlRx4Fy5JVNTilSqMuBwrXQsUqVCEjuSlSpVC6R//Z",
        },
        {
          title: "Chopsticks",
          url: "https://reviewed-com-res.cloudinary.com/image/fetch/s--pu1S-Hn4--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1578583637644/DSC_2080.jpg",
        },
        {
          title: "Shoes",
          url: "https://i.insider.com/626aafe6c8c8ac001940e44a?width=1000&format=jpeg&auto=webp",
        },
      ],
    },
    {
      id: "3",
      type: "prop:create",
      componentId: "三",
      gifSearchTerm: "wolverine blades",
      // gifSearchTerm: 'number three',
      gifSearchTerm2: "three friends",
      gifSearchTerm3: "3 idiots",
      title: `Pick a Prop for 三`,
      ideas: [
        {
          title: "3",
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUeiOX///8AguQAgOQAfuMYhuUAg+T5/P7I3vfv9v251fWlyfPy+P2AtO6Mu+/V5vnF3Pc0kefp8vyqzPN5sO3c6vptquyx0PQpjebd6/pDl+g3kueaw/GgxvJfpOuvz/RRnelkput+s+6Rv/BKmukAdeL7iYKvAAAMV0lEQVR4nO2daZequhKGISFx6BbEEYe2tdv7///iBd0oQ1WY3iCe1e+Xvc9ZewGPmSqVqorj/tflvPoDrOuP8P31R/j++iMEaLQIph/+6nQ+RFoIoR0n2p8vK385DyYj+6+3SvgZLGfnUHsy5lKxnJviP5L/iGmldA4nf7u2ymmLcBR8bJwYTf/DYqScmFR64Wq5tvQhdgh3HydHCjNbXjGms9kubHwMnHA0/XE8oZrgpe0pvNAfw3ssmHC+0clU0lpaqs0c+0lIwvEq/sAWjZdvSSXVLAB+FYxwcoxkxbRSG1LL6DhBfRiIcLeSXTpnWVpuQA0JIRyfwXyJlDxMER8HIJweJKZ3lhmj7wEQbh1LfDcJpzNjR8JpKO3h3Rmjjn21E2Gwt82XSO47zTkdCD83NvtnRkpuOqwd7Qk/OhkvzaTlV++E60Mjy7qzxKFtV21J6PfUQZ9S0u+RcB2JnvkSibDVHrIN4bH3BrxLtRqNzQk/z30sEbTk+dM+YeC8pgHvUmpsm/DovZAvkfdrl3Dzuh6aSl4sEk7C/hZ5XjpsZOE0IQxAe/iuUrrJ6t+AcPrqIfiUbOCtqk/4NRxAR3lbPKH/+jkmK+8DTTgbFmCDVaMm4eAA47FY0xKvRzhAwBhxhiMcJGDdVqxD+DtMwHgsHjGEH0MFjBFrLBrVhANa6MvyqrcalYTBkAEdJXZdCRdDsLWNqtoTVxCOomEY27zUoRvhefBN6OhNF8LZK3xqTVXhnzISDnoafcozbhdNhIt+3drtpUyzjYnw8CaAjjq3I/TfYRDeJQ27RZ5w2Et9QZJf+HnCV390I6l9c8Kf4a+EWQl2m8ERwvvov3BLKcUtFBP89LifcmF/HCHUWlNa6v3m+D0dB+tgPN8eN3uJCqB6vOPajPAXN48qIa5fQTHkcDT+PWDDjCSzV6QJF7BNr5L7JbceL34d5IKk6MBNmvCE6kHyat6iLoGnyZr2TJGEY1ATiqja+w48UKYXRZIwhLxUyTqOIndxRjUjbbxRhFtIE+qo0sHwT0cP1Iyk14YihLxNXGryxZqDWpHc7xOES8T7ajqk/ykAIUoiyo8gRCzFTcN7dhhEFdYhRDShXjUDjFsRM30TR6dlQsB7DJY+K4zHhHhziXALaELRJvkF4/WSpem0RBgB3rJsAQhahctrYpEQYM606aOJ1pB+KovhfUXCTfcfstxRamqG2GuUJrkC4QTQhNxGrVIjyJZRFrYyBcKv7sPdEOuyCObzwBDQ5CMaURT8bgVCwDxDLLp3vJlKkkmlF/ncVAvoQeUPyBMC1l3NbCj8p9tCe5xJB5gF4k6Ud/LnCVfdu4lH9sJJmOv+4krvxyEmeGEnnCfsPtTpPdqiGHar6RVlhOimSvGE8+4vKI7zu8qeO0F31D2km+bmuhwhYjGkZhGq89P+TchsqnJnplnCEcBRS82kO6praHJ/hbCK4xHBEQI6KenvutA/HEWI8YHlrKrsewBHFYLYZH/S9qZHuXHI5m6s3O+cJQQ82yNG1wfd8wRl+0wwxyURTbjr/vTCRH0X414W1B6Lae+myv7QGULmt26mw+Zrnm/HEZOCQho/oDYUmdzaDCHGlZ9U8lD72TJITXxuaGkqSAQzDh11IQkhz76/4FawJDr50/XIHTNdQ1A5zKjzhCzW429reJBlwinCM9M1yI0yZD10ckcYT0KII5gQ1/c96tANYtPEEluCcNVv9AztzUGF8GR8GU9CwOa3iQQ10XzCRkpYJhz1Gz6jNLVDRA3DeAyUCUFu9bqio5i4WanF89clQlsTDS1NbpQBVlWq51TzIIQ4K+tKh6QXg9mEtHqDXyLEdZBKKXkmAZEDRZ1KhCHu6RXS5DTqosIH/ulQJBz1Mgxjc06qXya+Bhvt+YiuSQlBJq9RUXjdHNmI5Sn2Cx5ezZQQZvJyov0yT6FXq4dfOCWc2u6lwpyiBDrIz7wv9aekhF+2FwvzmRsc8Om4TQlRRj0rNv4zESqgJiOdZtGmhNZ3FqaMAR8VFJXRw9+WEsKiETlFHJ47udqYAx6O75QQcmBgeiGbErG1k7fyeGFKaNuk4WKIRqf/WSLcFwhtvCQr7uA03vVuz1ZqFoUFQttTKeXuf2hno/JbOvBTQtsLvjSXI1mc0IyPA6i+COnD74ym6OyE9IChL0JRARgvGgfsSEnfmBJayGLJqSpbNxEs4PsmXSC0XMHrueU26QRsxdI4xD2a1N2GGk3G86kpKgqaWF0gtOwPFt/u3D87t7wuKQ9fTF1yZHJ8cbWwbLWp0MtkrCnBJX3iXA0lm8a2q634eMlERcGcNSW7FBJR1kQ6ordTqOeX9haAiLamn0AvIKiji9L+0Poen/gGutwDaM4r7fEhYQoNRReXAX1JyU9j3ddGiO6noICTkq/Nur+UEh0wjXGolPyli1fUF8gGhTz1DelOJZ/36CU1MDyKELLqq9K5RY9nTxnR+2LIo0tnT/bdiZToiGKEffUcAA/CFyyIXPo14jiaOAPGhUE0EL1tPAIIiXP8nmMx7qIziBCTKRGL0XM8zV10YBTC+iDiaV4ymdKEiJMoIibKwu7iXrDF+C/IXgog1D8EIcaUuOleiibaX/zleGGa+umZBtBLydhERHxpElEqRXSafczX6Qb3akDM/NQZAX5rMr4UYEqoy9c0KJ71mlY3MhIaslpksJ5/7R5zRUYjmPocfbjffcXP5gVBY/XJiBJTNR/S8gZYbdlMB2i+BT1x8I5KxhPe9TPy+TjZnJnuHhLysJ7vG1ShDteddJ9omJwZQP8niykYrCWyCbsvFmzeU3dPBn3Sy3l56b0T4Idmc9e6H7Ep0kE4Yv4xc+LWebDks6+wOaRkZlfcOah+qphqjt0tDz6HFJBiyUSvUffveExlAkAn5fOAu+dyc2Ez5WJX9DyKSNU15XID9heaCV+b5m/aExEXmwGwO/LGLrqmAhfD7U5WaVEFpYTw2aubu35ARU0FxLEI9+nu4niVnpSePn3xcYqAUwtjXQxAbRO+VOqNcrczVon/7B4TUlHbpHt1EWUsPV2lDSCd3FyfBnAWXFUF3qR5d3dYVY0hhFOxyXVTeX12fneNOlGAoAyl2978anJ41H15ybdVIgQkdrQt9rVCeIJLHag8uQP8pvrSBhByYU+58kiZEOFVZKrPGAW5sIfwFBELNOBFDYt73gAxpwoETvl/QVzDsmH1S8ylWTXrl2IiWgSbfkBodMI43Kn6PxQhJk9OO7VvmgwczJkJuRKThjIo779uIVrU1Yr0KkUSok5L69TzdqewwuxM3AP5VlhStdxXMG5D2NkzYxDbr6sfHdm8PGxhfUEbi8yG9Qh8s5ahPy9tqT7HPvZyBMb7yt5vAc0cd7SQ4cb/mI7XsYL50r+EUmDPnNnbyThC/D066R0lSTS7hauTS7umKsL3uJDsKcGuTLzjaPC35mVFFWOvJHxJCFFbsX3URIi8a8a2TNfnGQit5wbDZCw/bSKcvMulVq3vzkM49/pQ+/sP3+T6vIrrbMyE//17SN/hLll+JaxFOPz7gFWV+7mKcOAXPaqKLPg6hMO+UJYLBmhE6H4N13zzatyGUoMQ5imCy6tz7VkdQsiRiQXV8+XVIhwmYs2Tg3qEQ0SsezRSkxB0rgCUV/fes7qEmNM9nLzf6k9uSIg6/sKozjLRmHBISz8XFNeR0A0sOAHbSNU/1WpI6C6iIdjh+tAoJqkRoTs6vX6+aXq63IwwKQD4YkDP4FaDELrjlw7GZkOwHaE72b/OvpHn5mGBzQlf11OVyfELJXSDl8ypIuRd92jC2EztvRmVrG2nQQjjZux3NIp93TuwUYTQS9ErpbkjbKuE7uTSE6OSm7YRq90I466KCxUx8V0br4EwQmS4DycZtg6qhhDG20ZlkVHJqME+yRKh635Hlsajqoyo6okw7qshNPbnLi2vba9OzglCGM85K4m9u0GIn1YWTFkgQtf9/IokaNuhtDwsu2Te5AQjjDX+URKQPSjVrNPyUBCSMNZ85XQaklqqDWB2yQpM6CYt6Xityqwr4YX+mE1MbCs8Yazd8uLIJuF5SU0U5/JtuiCitawQJtptZwevBubtqsT9bNt261Apa4Q37ab+KdTJlepaq2QSSniTP5TSSTCmp8OTP7UGd5NdwptGi2C+/F2drvsoGWzaicL99bT6Xc6DBXzUldUD4Yv1R/j++iN8f/0Rvr/+DxgToVcbGD9NAAAAAElFTkSuQmCC",
        },
        {
          title: "3 Idiots",
          url: "https://circle.youthop.com/wp-content/uploads/2021/07/3_Idiots.jpg",
        },
        {
          title: "Wolverine Blades",
          url: "https://i.etsystatic.com/14644108/r/il/02e40a/1217196807/il_fullxfull.1217196807_6fua.jpg",
        },
      ],
    },
  ],
};

export function HanziMovieMethod() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mediaIndex, setMediaIndex] = useState(0);
  const playerRef = useRef() as any;
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const onReady = useCallback(() => {
    // const timeToStart = 7 * 60 + 12.6
    playerRef.current.seekTo(0, "seconds");
  }, [playerRef.current]);

  const [lessonIndex, setLessonIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const lesson = firstLesson?.lessons[lessonIndex];

  const setResponse = (lessonId: string, value: any) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [lessonId]: value,
      };
    });

    setLessonIndex((idx) => idx + 1);
  };
  // const queryId = uuidv4()

  const { data: queryResult } = useSearchQuery({
    // queryId: queryId,
    query: firstLesson?.lessons[lessonIndex]?.gifSearchTerm,
  });
  const { data: queryResult2 } = useSearchQuery({
    // queryId: queryId,
    query: firstLesson?.lessons[lessonIndex]?.gifSearchTerm2,
  });
  const { data: queryResult3 } = useSearchQuery({
    // queryId: queryId,
    query: firstLesson?.lessons[lessonIndex]?.gifSearchTerm3,
  });

  const reset = () => {
    setAnswers({});

    setLessonIndex(0);
  };



  if (!lesson) {
    return (
      <div className="relative grow flex flex-col items-center">
        <Header className="my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold">
          Play
        </Header>

        <p>You have completed all the lessons</p>

        <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
          {JSON.stringify(answers)}
        </div>

        <div className="absolute bottom-0 py-8">
          <button
            onClick={reset}
            className="hover:shadow-blue-600 shadow-md px-4 py-1 rounded-full"
          >
            Complete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grow flex flex-col items-center">
      <Header className="my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold">
        {lesson?.title}
      </Header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {lesson?.ideas
          .concat(queryResult?.data.slice(0, 1) || [])
          .map((idea: any) => {
            return (
              <button
                key={JSON.stringify(idea)}
                className=""
                onClick={() => {
                  setResponse(lesson.id, idea?.title);
                }}
              >
                <img
                  alt={idea.title}
                  src={idea?.images?.original?.url || idea?.url}
                  className="h-[200px]"
                />
              </button>
            );
          })}
      </div>

      {/* <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
        {queryResult?.data
          .slice(0, 1)
          .concat((queryResult2?.data || []).slice(0, 1))
          .concat((queryResult3?.data || []).slice(0, 1))
          .map(idea => {
            return (
              <button
                className=''
                onClick={() => {
                  setResponse(lesson.id, idea?.title)
                }}
              >
                <img
                  alt={idea.title}
                  src={idea?.images?.original?.url}
                  className='h-[200px]'
                />
              </button>
            )
          })}
      </div> */}

      <div className="my-8 py-8 w-full items-center justify-center flex space-x-8 md:space-x-16">
        {JSON.stringify(answers)}
      </div>

      <div className="py-32">
        <button
          className="hover:shadow-blue-600 shadow-md px-4 py-1 rounded-full"
          onClick={() => {
            setLessonIndex((idx) => idx + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

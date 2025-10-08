for(let num=1;num<=3;num++) {
    for (let contador=1; contador<=10;contador++)
    {
    if (contador == 7)
    break;
    console.log(`Vuelta: ${num} -> Valor: ${contador}`);
    }
}

for (let contador=1; contador<=10;contador++)
{
if (contador%2 != 0)
continue;
console.log(`Valor: ${contador}`);
}

let num=0;
while(num <=10) {
    num++;
    if(num%2 != 0) {
        continue;
        console.log(`Valor: ${num}`);
    }
}
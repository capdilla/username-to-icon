import v5 from 'uuid/v5'

class Algorithm {

    sliceArrayIn8Bits(arr) {
        const Arr16BitsLeft = arr.slice(0, 16);
        const Arr16BitsRight = arr.slice(16, 32);

        //left in 8bits
        const Arr8BitsLeftLeft = Arr16BitsLeft.slice(0, 8);
        const Arr8BitsLeftRight = Arr16BitsLeft.slice(8, 16);

        //right in 8 bits
        const Arr8BitsRightLeft = Arr16BitsRight.slice(0, 8);
        const Arr8BitsRightRight = Arr16BitsRight.slice(8, 16);


        const byteLeft = this.sum8BitsXOR(Arr8BitsLeftLeft, Arr8BitsLeftRight);
        const byteRight = this.sum8BitsXOR(Arr8BitsRightLeft, Arr8BitsRightRight);

        return this.sum8BitsXOR(byteLeft, byteRight);
    }

    sum8BitsXOR(left, right) {
        return left.map((byte, key) => {

            let newByte = "";
            for (let i = 0; i < 8; i++) {
                //xor sum
                newByte = newByte + (parseInt(byte[i]) ^ parseInt(right[key][i])).toString()
            }
            return newByte;
        })
    }

    generate(name) {

        const hash = v5(name, v5.DNS);
        const [firstColor, y, secondColor, x, backgroundColor] = hash.split('-');
        const regex = /-/gm;
        const hashToBinary = hash.replace(regex, ' ');

        //convert to binary
        let bytes = "";
        for (var i = 0; i < hashToBinary.length; i++) {
            let bin = hashToBinary[i].charCodeAt(0).toString(2);
            //convert to 8 bit
            const bitsLeft = 8 - bin.length;
            if (bitsLeft > 0) {
                for (var bit = 0; bit < bitsLeft; bit++) {
                    bin = "0" + bin;
                }
            }
            bytes += bin + " ";
        }

        //convert bytes to array of byte
        bytes = bytes.split(" ");

        //get last 4 bytes
        const last4Bytes = bytes.slice(32, 36);
        //reverse the las 4 bytes
        let reversed4LastBytes = last4Bytes.map(byte => byte.split("").reverse().join(""))

        //convert to Dec all the reverse bytes
        const reversed4LastBytesToDec = reversed4LastBytes.map(bytes => parseInt(bytes, 2));
        //get the max and min 
        const maxIndex = reversed4LastBytesToDec.indexOf(Math.max(...reversed4LastBytesToDec));
        const minIndx = reversed4LastBytesToDec.indexOf(Math.min(...reversed4LastBytesToDec));
        //put the original reverse bytes and add the max, min and the remove from the reversed4LastBytes the max,and min
        const new8Bytes = [
            ...reversed4LastBytes,
            reversed4LastBytes[maxIndex],
            reversed4LastBytes[minIndx],
            ...reversed4LastBytes.filter((b, i) => (i != maxIndex && i != minIndx)) // remove the max and min
        ];

        // get the first 32 bytes
        bytes = this.sliceArrayIn8Bits(bytes.slice(0, 32));

        //convert each byte in a matrix 2*2 of bits
        const items = this.sum8BitsXOR(new8Bytes, bytes).map(y => y.split(""));

        return { items, firstColor, secondColor, backgroundColor: "#" + backgroundColor.substr(0, 8) }
    }
}

export default (name) => {
    return new Algorithm().generate(name)
}
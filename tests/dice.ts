import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Dice } from "../target/types/dice";
import { PublicKey,Keypair } from "@solana/web3.js";
import bs58 from "bs58";

describe("anchor", () => {

  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Dice as Program<Dice>;

  // DhamKHYC2e5na9gZHQM3giQkQTzeH3ES6fwbnAENbkCC(随机生成的，里面真没钱～)
  const signer = Keypair.fromSecretKey(
    bs58.decode(
      bs58.encode(new Uint8Array([47,74,2,71,120,122,120,187,40,23,238,158,169,134,192,42,57,220,54,161,114,91,78,244,209,94,122,54,83,182,35,130,188,177,167,18,15,42,41,77,248,146,140,73,206,202,76,189,26,232,228,119,145,48,109,17,236,82,168,157,59,251,27,21])),
    ),
  );


  it("Init", async () => {
    try {


      const [gamePDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("game")],
        program.programId,
      );

      console.log("gamePDA:",gamePDA.toString())

      let balance = await program.provider.connection.getBalance(gamePDA);
      if (balance<=0) {

        const tx = await program.methods
        .init()
        .accounts({
          signer: signer.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([signer])
        .rpc();
 
        console.log(`init tx: ${tx}`);
      }

      const accountData = await program.account.game.fetch(gamePDA);
      console.log(`game account: ${JSON.stringify(accountData)}`);


    } catch (error) {
      console.log(error);
    }
  });
  
});

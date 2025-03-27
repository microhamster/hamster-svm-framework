use anchor_lang::prelude::*;

mod state;
mod instructions;
mod constants;
mod error;

use state::*;
use constants::*;
use instructions::*;

declare_id!("6CYQopU5HkLcpdR8X3UQbhWj5QzRcPHat1VH62gFa6WK");

#[program]
pub mod dice {

    use super::*;
 
    pub fn init(ctx: Context<Setting>) -> Result<()> {
        ctx.accounts.init()?;
        Ok(())
    }

}


        

        
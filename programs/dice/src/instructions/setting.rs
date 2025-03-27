use anchor_lang::prelude::*;

use crate::state::*;
use crate::error::*;
use crate::constants::*;

#[derive(Accounts)]
pub struct Setting<'info> {

    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        seeds = [GAME_SEED],
        bump,
        payer = signer,
        space = ANCHOR_DISCRIMINATOR + Game::INIT_SPACE
    )]
    pub game_account: Box<Account<'info,Game>>,
    
    pub system_program: Program<'info,System>,
}

impl<'info> Setting<'info> {

    pub fn init(&mut self) -> Result<()> {

        self.game_account.dice_max = 1024;
        self.game_account.dice_edge = 512;

        Ok(())
    }
}
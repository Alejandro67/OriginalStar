import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const EXO_PLANET = "185.17879166666665,17.79325277777778";
    const QUERY = `SELECT+TOP+2000+gaia_source.designation,gaia_source.source_id,gaia_source.ra,gaia_source.dec,gaia_source.parallax,gaia_source.pmra,gaia_source.pmdec,gaia_source.ruwe,gaia_source.phot_g_mean_mag,gaia_source.bp_rp,gaia_source.radial_velocity,gaia_source.phot_variable_flag,gaia_source.non_single_star,gaia_source.has_xp_continuous,gaia_source.has_xp_sampled,gaia_source.has_rvs,gaia_source.has_epoch_photometry,gaia_source.has_epoch_rv,gaia_source.has_mcmc_gspphot,gaia_source.has_mcmc_msc,gaia_source.teff_gspphot,gaia_source.logg_gspphot,gaia_source.mh_gspphot,gaia_source.distance_gspphot,gaia_source.azero_gspphot,gaia_source.ag_gspphot,gaia_source.ebpminrp_gspphot+FROM+gaiadr3.gaia_source+WHERE+CONTAINS(POINT('ICRS',gaiadr3.gaia_source.ra,gaiadr3.gaia_source.dec),CIRCLE('ICRS',${EXO_PLANET},0.5555555555555556))=1+AND+(gaiadr3.gaia_source.classprob_dsc_combmod_star>=0.5+AND+gaiadr3.gaia_source.teff_gspphot>=0)`;
    const url =
      "https://gea.esac.esa.int/tap-server/tap/sync?REQUEST=doQuery&LANG=ADQL&RESPONSEFORMAT=json&QUERY=" +
      QUERY;

    const response = await axios.get(`${url}`);

    return NextResponse.json(response.data);
  } catch (e: any) {
    console.log(e);
    if (e.response.data) {
      return NextResponse.json(
        { error: e.response.data.message },
        { status: e.status }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

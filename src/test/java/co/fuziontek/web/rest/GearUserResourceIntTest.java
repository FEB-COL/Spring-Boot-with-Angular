package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearUser;
import co.fuziontek.repository.GearUserRepository;
import co.fuziontek.service.GearUserService;
import co.fuziontek.service.dto.GearUserDTO;
import co.fuziontek.service.mapper.GearUserMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearUserResource REST controller.
 *
 * @see GearUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearUserResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_AVATAR = "AAAAAAAAAA";
    private static final String UPDATED_AVATAR = "BBBBBBBBBB";

    private static final String DEFAULT_PROFILE = "AAAAAAAAAA";
    private static final String UPDATED_PROFILE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    private static final String DEFAULT_ID_ALFRESCO = "AAAAAAAAAA";
    private static final String UPDATED_ID_ALFRESCO = "BBBBBBBBBB";

    private static final Integer DEFAULT_LOGIN_ATTEMPTS = 1;
    private static final Integer UPDATED_LOGIN_ATTEMPTS = 2;

    private static final LocalDate DEFAULT_LAST_UPDATE_PASSWORD_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_UPDATE_PASSWORD_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PASSWORD_RESET_KEY = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD_RESET_KEY = "BBBBBBBBBB";

    private static final Integer DEFAULT_PIN = 1;
    private static final Integer UPDATED_PIN = 2;

    @Autowired
    private GearUserRepository gearUserRepository;

    @Autowired
    private GearUserMapper gearUserMapper;

    @Autowired
    private GearUserService gearUserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearUserMockMvc;

    private GearUser gearUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearUserResource gearUserResource = new GearUserResource(gearUserService);
        this.restGearUserMockMvc = MockMvcBuilders.standaloneSetup(gearUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GearUser createEntity(EntityManager em) {
        GearUser gearUser = new GearUser()
            .name(DEFAULT_NAME)
            .password(DEFAULT_PASSWORD)
            .email(DEFAULT_EMAIL)
            .avatar(DEFAULT_AVATAR)
            .profile(DEFAULT_PROFILE)
            .state(DEFAULT_STATE)
            .idAlfresco(DEFAULT_ID_ALFRESCO)
            .loginAttempts(DEFAULT_LOGIN_ATTEMPTS)
            .lastUpdatePasswordDate(DEFAULT_LAST_UPDATE_PASSWORD_DATE)
            .passwordResetKey(DEFAULT_PASSWORD_RESET_KEY)
            .pin(DEFAULT_PIN);
        return gearUser;
    }

    @Before
    public void initTest() {
        gearUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearUser() throws Exception {
        int databaseSizeBeforeCreate = gearUserRepository.findAll().size();

        // Create the GearUser
        GearUserDTO gearUserDTO = gearUserMapper.toDto(gearUser);
        restGearUserMockMvc.perform(post("/api/gear-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearUserDTO)))
            .andExpect(status().isCreated());

        // Validate the GearUser in the database
        List<GearUser> gearUserList = gearUserRepository.findAll();
        assertThat(gearUserList).hasSize(databaseSizeBeforeCreate + 1);
        GearUser testGearUser = gearUserList.get(gearUserList.size() - 1);
        assertThat(testGearUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testGearUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testGearUser.getAvatar()).isEqualTo(DEFAULT_AVATAR);
        assertThat(testGearUser.getProfile()).isEqualTo(DEFAULT_PROFILE);
        assertThat(testGearUser.isState()).isEqualTo(DEFAULT_STATE);
        assertThat(testGearUser.getIdAlfresco()).isEqualTo(DEFAULT_ID_ALFRESCO);
        assertThat(testGearUser.getLoginAttempts()).isEqualTo(DEFAULT_LOGIN_ATTEMPTS);
        assertThat(testGearUser.getLastUpdatePasswordDate()).isEqualTo(DEFAULT_LAST_UPDATE_PASSWORD_DATE);
        assertThat(testGearUser.getPasswordResetKey()).isEqualTo(DEFAULT_PASSWORD_RESET_KEY);
        assertThat(testGearUser.getPin()).isEqualTo(DEFAULT_PIN);
    }

    @Test
    @Transactional
    public void createGearUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearUserRepository.findAll().size();

        // Create the GearUser with an existing ID
        gearUser.setId(1L);
        GearUserDTO gearUserDTO = gearUserMapper.toDto(gearUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearUserMockMvc.perform(post("/api/gear-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearUser in the database
        List<GearUser> gearUserList = gearUserRepository.findAll();
        assertThat(gearUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearUsers() throws Exception {
        // Initialize the database
        gearUserRepository.saveAndFlush(gearUser);

        // Get all the gearUserList
        restGearUserMockMvc.perform(get("/api/gear-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].avatar").value(hasItem(DEFAULT_AVATAR.toString())))
            .andExpect(jsonPath("$.[*].profile").value(hasItem(DEFAULT_PROFILE.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())))
            .andExpect(jsonPath("$.[*].idAlfresco").value(hasItem(DEFAULT_ID_ALFRESCO.toString())))
            .andExpect(jsonPath("$.[*].loginAttempts").value(hasItem(DEFAULT_LOGIN_ATTEMPTS)))
            .andExpect(jsonPath("$.[*].lastUpdatePasswordDate").value(hasItem(DEFAULT_LAST_UPDATE_PASSWORD_DATE.toString())))
            .andExpect(jsonPath("$.[*].passwordResetKey").value(hasItem(DEFAULT_PASSWORD_RESET_KEY.toString())))
            .andExpect(jsonPath("$.[*].pin").value(hasItem(DEFAULT_PIN)));
    }
    
    @Test
    @Transactional
    public void getGearUser() throws Exception {
        // Initialize the database
        gearUserRepository.saveAndFlush(gearUser);

        // Get the gearUser
        restGearUserMockMvc.perform(get("/api/gear-users/{id}", gearUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearUser.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.avatar").value(DEFAULT_AVATAR.toString()))
            .andExpect(jsonPath("$.profile").value(DEFAULT_PROFILE.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()))
            .andExpect(jsonPath("$.idAlfresco").value(DEFAULT_ID_ALFRESCO.toString()))
            .andExpect(jsonPath("$.loginAttempts").value(DEFAULT_LOGIN_ATTEMPTS))
            .andExpect(jsonPath("$.lastUpdatePasswordDate").value(DEFAULT_LAST_UPDATE_PASSWORD_DATE.toString()))
            .andExpect(jsonPath("$.passwordResetKey").value(DEFAULT_PASSWORD_RESET_KEY.toString()))
            .andExpect(jsonPath("$.pin").value(DEFAULT_PIN));
    }

    @Test
    @Transactional
    public void getNonExistingGearUser() throws Exception {
        // Get the gearUser
        restGearUserMockMvc.perform(get("/api/gear-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearUser() throws Exception {
        // Initialize the database
        gearUserRepository.saveAndFlush(gearUser);

        int databaseSizeBeforeUpdate = gearUserRepository.findAll().size();

        // Update the gearUser
        GearUser updatedGearUser = gearUserRepository.findById(gearUser.getId()).get();
        // Disconnect from session so that the updates on updatedGearUser are not directly saved in db
        em.detach(updatedGearUser);
        updatedGearUser
            .name(UPDATED_NAME)
            .password(UPDATED_PASSWORD)
            .email(UPDATED_EMAIL)
            .avatar(UPDATED_AVATAR)
            .profile(UPDATED_PROFILE)
            .state(UPDATED_STATE)
            .idAlfresco(UPDATED_ID_ALFRESCO)
            .loginAttempts(UPDATED_LOGIN_ATTEMPTS)
            .lastUpdatePasswordDate(UPDATED_LAST_UPDATE_PASSWORD_DATE)
            .passwordResetKey(UPDATED_PASSWORD_RESET_KEY)
            .pin(UPDATED_PIN);
        GearUserDTO gearUserDTO = gearUserMapper.toDto(updatedGearUser);

        restGearUserMockMvc.perform(put("/api/gear-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearUserDTO)))
            .andExpect(status().isOk());

        // Validate the GearUser in the database
        List<GearUser> gearUserList = gearUserRepository.findAll();
        assertThat(gearUserList).hasSize(databaseSizeBeforeUpdate);
        GearUser testGearUser = gearUserList.get(gearUserList.size() - 1);
        assertThat(testGearUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testGearUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testGearUser.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testGearUser.getProfile()).isEqualTo(UPDATED_PROFILE);
        assertThat(testGearUser.isState()).isEqualTo(UPDATED_STATE);
        assertThat(testGearUser.getIdAlfresco()).isEqualTo(UPDATED_ID_ALFRESCO);
        assertThat(testGearUser.getLoginAttempts()).isEqualTo(UPDATED_LOGIN_ATTEMPTS);
        assertThat(testGearUser.getLastUpdatePasswordDate()).isEqualTo(UPDATED_LAST_UPDATE_PASSWORD_DATE);
        assertThat(testGearUser.getPasswordResetKey()).isEqualTo(UPDATED_PASSWORD_RESET_KEY);
        assertThat(testGearUser.getPin()).isEqualTo(UPDATED_PIN);
    }

    @Test
    @Transactional
    public void updateNonExistingGearUser() throws Exception {
        int databaseSizeBeforeUpdate = gearUserRepository.findAll().size();

        // Create the GearUser
        GearUserDTO gearUserDTO = gearUserMapper.toDto(gearUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearUserMockMvc.perform(put("/api/gear-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearUser in the database
        List<GearUser> gearUserList = gearUserRepository.findAll();
        assertThat(gearUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearUser() throws Exception {
        // Initialize the database
        gearUserRepository.saveAndFlush(gearUser);

        int databaseSizeBeforeDelete = gearUserRepository.findAll().size();

        // Get the gearUser
        restGearUserMockMvc.perform(delete("/api/gear-users/{id}", gearUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearUser> gearUserList = gearUserRepository.findAll();
        assertThat(gearUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearUser.class);
        GearUser gearUser1 = new GearUser();
        gearUser1.setId(1L);
        GearUser gearUser2 = new GearUser();
        gearUser2.setId(gearUser1.getId());
        assertThat(gearUser1).isEqualTo(gearUser2);
        gearUser2.setId(2L);
        assertThat(gearUser1).isNotEqualTo(gearUser2);
        gearUser1.setId(null);
        assertThat(gearUser1).isNotEqualTo(gearUser2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearUserDTO.class);
        GearUserDTO gearUserDTO1 = new GearUserDTO();
        gearUserDTO1.setId(1L);
        GearUserDTO gearUserDTO2 = new GearUserDTO();
        assertThat(gearUserDTO1).isNotEqualTo(gearUserDTO2);
        gearUserDTO2.setId(gearUserDTO1.getId());
        assertThat(gearUserDTO1).isEqualTo(gearUserDTO2);
        gearUserDTO2.setId(2L);
        assertThat(gearUserDTO1).isNotEqualTo(gearUserDTO2);
        gearUserDTO1.setId(null);
        assertThat(gearUserDTO1).isNotEqualTo(gearUserDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearUserMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearUserMapper.fromId(null)).isNull();
    }
}
